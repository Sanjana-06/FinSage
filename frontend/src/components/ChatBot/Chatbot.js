import React, { useState } from "react";
import axios from "axios";

export default function ChatUI() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && inputText.trim()) {
      const userMessage = { text: inputText, sender: "user" };
      setMessages((prev) => [...prev, userMessage]);
      setIsSubmitted(true);

      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: inputText }],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer YOUR_OPENAI_API_KEY`,
            },
          }
        );

        const botMessage = {
          text: response.data.choices[0].message.content.trim(),
          sender: "bot",
        };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Error calling OpenAI API:", error);
        setMessages((prev) => [
          ...prev,
          { text: "Something went wrong. Please try again.", sender: "bot" },
        ]);
      }

      setInputText("");
      setTimeout(() => setIsSubmitted(false), 500);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "rgba(10, 25, 50)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "100%",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
          borderRadius: "16px",
          padding: "24px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          minHeight: "90vh",
        }}
      >
        {/* Chat messages section */}
        <div style={{ flex: 1, overflowY: "auto", marginBottom: "20px" }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent:
                  msg.sender === "user" ? "flex-start" : "flex-end",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: msg.sender === "user" ? "row" : "row-reverse",
                  alignItems: "flex-start",
                  maxWidth: "80%",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor:
                      msg.sender === "user"
                        ? "rgba(10, 25, 50)"
                        : "rgba(255, 255, 255, 0.8)",
                    color:
                      msg.sender === "user"
                        ? "white"
                        : "rgba(10, 25, 50, 0.8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: msg.sender === "user" ? "10px" : "0",
                    marginLeft: msg.sender === "bot" ? "10px" : "0",
                    fontSize: "16px",
                  }}
                >
                  {msg.sender === "user" ? "👤" : "🤖"}
                </div>

                <div
                  style={{
                    backgroundColor:
                      msg.sender === "user" ? "white" : "rgba(255, 255, 255, 0.85)",
                    color: "rgba(10, 25, 50)",
                    borderRadius: "8px",
                    padding: "10px 14px",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
                    fontSize: "14px",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Centered input and embedded button */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div style={{ position: "relative", width: "80%", maxWidth: "800px" }}>
            <input
              type="text"
              placeholder="Type your message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                width: "100%",
                padding: "10px 48px 10px 12px",
                paddingRight:"1px",
                borderRadius: "8px",
                border: "none",
                outline: "none",
                backgroundColor: "white",
                color: "rgba(10, 25, 50)",
                fontSize: "14px",
              }}
            />
            <button
              style={{
                position: "absolute",
                top: "50%",
                right: "0px",
                transform: "translateY(-50%)",
                backgroundColor: "rgba(10, 25, 50)",
                border: "none",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
                cursor: "pointer",
                boxShadow: "0 0 6px rgba(10, 25, 50, 0.3)",
              }}
            >
              <span
                style={{
                  color: "rgba(255, 255, 255, 0.8)",
                  fontSize: "14px",
                  lineHeight: "0",
                }}
              >
                {isSubmitted ? "▣" : "↑"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
