import { Container, Grid2 as Grid, Typography } from "@mui/material";
import "./Chat.css";
import { CSSProperties, useEffect, useState } from "react";
import { SendMessage } from "./SendMessage";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { FirebaseDB } from "../../firebase/firebase.config";

export type ChatProps = {
  height?: number | string;
  width?: number | string;
};

export const Chat = ({ height = 400, width = 250 }: ChatProps) => {
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const usuarioId = "usuarioPrueba";
  useEffect(() => {
    const newQuery = query(
      collection(FirebaseDB, `messages`),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(newQuery, {
      next: (snapshot) => {
        const currentMessages: DocumentData[] = [];
        snapshot.forEach((item) => {
          currentMessages.push({
            content: item.data(),
            id: item.id,
          });
          setMessages(currentMessages);
        });
      },
    });

    return unsubscribe;
  }, []);

  return (
    <Container sx={{ p: 2 }}>
      <Grid
        container
        flexDirection="column"
        sx={{
          height,
          //width: width * 4,
          width: typeof width === "number" ? width * 4 : width,
          boxShadow: "-4px -1px 18px -6px rgba(0,0,0,0.75);",
          borderRadius: "9px",
          overflow: "hidden",
        }}
      >
        <Grid
          container
          flex={1}
          sx={{ p: 1, overflow: "auto" }}
          flexDirection="column"
          wrap="nowrap"
          className="barraDesplazamiento"
          gap={2}
        >
          {messages &&
            messages.map((item, index) => (
              <Message
                isUserMessageOwner={item.content.usuarioId === usuarioId}
                message={item}
                key={index + 1}
              />
            ))}
        </Grid>
        <SendMessage />
      </Grid>
    </Container>
  );
};

const commonMessageStyle: CSSProperties = {
  padding: 1,
  borderRadius: "9px",
  flexDirection: "column",
};

const userMessageStyle: CSSProperties = {
  backgroundColor: "rgba(173, 216, 230,.8)",
  color: "#555",
};

const otherUserMessageStyle: CSSProperties = {
  justifyContent: "flex-end",
  backgroundColor: "rgba(255,69,0,.8);",
  color: "white",
  marginLeft: 1,
};

type MessageProps = {
  isUserMessageOwner: boolean;
  message: DocumentData;
};

const Message = ({
  isUserMessageOwner,
  message: { content },
}: MessageProps) => {
  const [containerStyle, setContainerStyle] = useState({});

  useEffect(() => {
    setContainerStyle(
      isUserMessageOwner
        ? { ...commonMessageStyle, ...userMessageStyle }
        : { ...commonMessageStyle, ...otherUserMessageStyle }
    );
  }, [isUserMessageOwner]);

  const date = new Date(content.timestamp?.seconds * 1000);
  const h = date.getHours();
  const m = date.getMinutes();
  const time = h + ":" + m;
  const newDate = date.toLocaleDateString("es-UY", {
    month: "long",
    day: "numeric",
  });

  return (
    <Grid container sx={containerStyle}>
      <Grid aria-label="username">
        <Typography fontWeight={600}>{content.usuarioId}:</Typography>
      </Grid>
      <Grid aria-label="message">
        <Typography variant="body2">{content.text}</Typography>
      </Grid>
      <Grid aria-label="date">
        <Typography variant="caption">{`${newDate} - ${time}`}</Typography>
      </Grid>
    </Grid>
  );
};
