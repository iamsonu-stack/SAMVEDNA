import React from "react";
import { useNavigate } from "react-router-dom";

type Message = {
  sender: "bot" | "user";
  text: string;
};

export default function VictimChatbotPage() {
  const navigate = useNavigate();

  const [messages, setMessages] =
    React.useState<Message[]>([
      {
        sender: "bot",
        text:
          "Hello. I am SAMVEDNA Support. I can help with your private check-in, available support options, or a short calming option. You can skip any question or ask for human support.",
      },
      {
        sender: "bot",
        text:
          "Is this a safe time for you to continue?",
      },
    ]);

  const [input, setInput] =
    React.useState("");

  function sendMessage() {

    if (!input.trim()) {
      return;
    }

    const userMessage = input.trim();

    setMessages((previous) => [
      ...previous,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setInput("");

    setTimeout(() => {

      const lower =
        userMessage.toLowerCase();

      let response =
        "Thank you for sharing that. You can complete a private check-in or request human support if you need it.";

      if (
        lower.includes("unsafe") ||
        lower.includes("danger") ||
        lower.includes("threat")
      ) {
        response =
          "Thank you for telling me. Because you may feel unsafe, routine support options should pause and an authorized human support professional should review your situation. Please use your approved local emergency or support contact if you need immediate help.";
      }

      else if (
        lower.includes("stress") ||
        lower.includes("stressed")
      ) {
        response =
          "I understand. You can complete a short well-being check-in to record how you are feeling today. If there is no immediate safety concern, you may also choose an optional short calming activity.";
      }

      else if (
        lower.includes("check") ||
        lower.includes("check-in") ||
        lower.includes("checkin")
      ) {
        response =
          "You can start today's voluntary check-in from the button below. The questions focus on your current well-being rather than asking you to repeat traumatic details.";
      }

      else if (
        lower.includes("counsell") ||
        lower.includes("counsel")
      ) {
        response =
          "You can request counselling or psychosocial support. SAMVEDNA can record your support request for authorized personnel; the final referral is handled by the appropriate human professional.";
      }

      else if (
        lower.includes("legal") ||
        lower.includes("law")
      ) {
        response =
          "I can help you find approved legal-aid or case-support information. I cannot provide a definitive legal strategy or decide your case.";
      }

      else if (
        lower.includes("pause")
      ) {
        response =
          "You can pause the routine check-in process. Your monitoring preferences can be changed according to the consent settings.";
      }

      setMessages((previous) => [
        ...previous,
        {
          sender: "bot",
          text: response,
        },
      ]);

    }, 500);
  }

  return (
    <div className="min-h-screen bg-slate-50 p-5">

      <div className="max-w-4xl mx-auto">

        {/* Header */}

        <div className="flex items-center justify-between mb-5">

          <div>

            <button
              onClick={() =>
                navigate("/victim-dashboard")
              }
              className="text-sm text-indigo-600 font-semibold"
            >
              ← Dashboard
            </button>

            <h1 className="text-3xl font-bold text-slate-900 mt-3">
              SAMVEDNA Support
            </h1>

            <p className="text-slate-500 mt-1">
              Private support and check-in assistance
            </p>

          </div>

          <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl">
            S
          </div>

        </div>


        {/* Chat */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

          <div className="h-[520px] overflow-y-auto p-5 space-y-4">

            {messages.map(
              (message, index) => (

                <div
                  key={index}
                  className={
                    message.sender === "user"
                      ? "flex justify-end"
                      : "flex justify-start"
                  }
                >

                  <div
                    className={
                      message.sender === "user"
                        ? "max-w-[80%] bg-indigo-600 text-white px-4 py-3 rounded-2xl rounded-br-md"
                        : "max-w-[80%] bg-slate-100 text-slate-800 px-4 py-3 rounded-2xl rounded-bl-md"
                    }
                  >
                    {message.text}
                  </div>

                </div>

              )
            )}

          </div>


          {/* Quick Actions */}

          <div className="border-t border-slate-200 p-4">

            <div className="flex flex-wrap gap-2 mb-4">

              <button
                onClick={() =>
                  setInput("I want to complete my check-in")
                }
                className="px-3 py-2 rounded-lg bg-indigo-50 text-indigo-700 text-sm"
              >
                Start Check-in
              </button>

              <button
                onClick={() =>
                  setInput("I am feeling stressed")
                }
                className="px-3 py-2 rounded-lg bg-amber-50 text-amber-700 text-sm"
              >
                I feel stressed
              </button>

              <button
                onClick={() =>
                  setInput("I want counselling support")
                }
                className="px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-sm"
              >
                Counselling
              </button>

              <button
                onClick={() =>
                  setInput("I want human support")
                }
                className="px-3 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm"
              >
                Human Support
              </button>

            </div>


            {/* Input */}

            <div className="flex gap-3">

              <input
                type="text"
                value={input}
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Type your message..."
                className="
                  flex-1
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-slate-300
                  outline-none
                  focus:border-indigo-500
                "
              />

              <button
                onClick={sendMessage}
                className="
                  px-6
                  rounded-xl
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  font-semibold
                "
              >
                Send
              </button>

            </div>

            <p className="text-xs text-slate-400 mt-3">
              SAMVEDNA support chat is not a medical diagnosis,
              therapy, emergency service, or legal decision system.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}