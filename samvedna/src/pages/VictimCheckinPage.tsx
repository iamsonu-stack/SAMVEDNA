import React from "react";
import { useNavigate } from "react-router-dom";

type Question = {
  id: string;
  question: string;
  options: string[];
};

const dailyQuestions: Question[] = [
  {
    id: "feeling",
    question: "Compared with your usual day, how are you feeling today?",
    options: [
      "Calmer",
      "About the same",
      "More stressed",
      "I need support",
    ],
  },
  {
    id: "stress",
    question: "How would you describe your stress level today?",
    options: [
      "Very low",
      "Low",
      "Moderate",
      "High",
      "Very high",
    ],
  },
  {
    id: "sleep",
    question: "How has your sleep been recently?",
    options: [
      "Good",
      "Mostly okay",
      "Some difficulty",
      "Very difficult",
      "Prefer not to say",
    ],
  },
  {
    id: "factor",
    question: "What is affecting you today?",
    options: [
      "Sleep",
      "Safety / fear",
      "Case-related updates",
      "Family / social pressure",
      "Financial pressure",
      "Something else",
      "Nothing specific",
    ],
  },
  {
    id: "support",
    question: "What kind of support would feel useful right now?",
    options: [
      "Someone to talk to",
      "Counselling support",
      "Information / guidance",
      "Safety / protection support",
      "I am not sure",
      "No support needed right now",
    ],
  },
  {
    id: "safety",
    question: "Do you feel unsafe right now or need urgent help?",
    options: [
      "Yes",
      "No",
      "Prefer not to say",
    ],
  },
];

export default function VictimCheckinPage() {
  const navigate = useNavigate();

  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [submitted, setSubmitted] = React.useState(false);

  const victimId =
    localStorage.getItem("samvedna_victim_id") || "V-XXXX";

  function handleAnswer(
    questionId: string,
    answer: string
  ) {
    setAnswers((previous) => ({
      ...previous,
      [questionId]: answer,
    }));
  }

  function calculateScore() {
    let score = 0;

    if (
      answers.feeling === "More stressed"
    ) {
      score += 15;
    }

    if (
      answers.feeling === "I need support"
    ) {
      score += 25;
    }

    if (
      answers.stress === "Moderate"
    ) {
      score += 10;
    }

    if (
      answers.stress === "High"
    ) {
      score += 20;
    }

    if (
      answers.stress === "Very high"
    ) {
      score += 30;
    }

    if (
      answers.sleep === "Some difficulty"
    ) {
      score += 10;
    }

    if (
      answers.sleep === "Very difficult"
    ) {
      score += 20;
    }

    if (
      answers.safety === "Yes"
    ) {
      score += 30;
    }

    return Math.min(score, 100);
  }

  function handleSubmit(
    event: React.FormEvent
  ) {
    event.preventDefault();

    const unanswered = dailyQuestions.some(
      (question) =>
        !answers[question.id]
    );

    if (unanswered) {
      alert(
        "Please answer the questions or choose 'Prefer not to say' where available."
      );
      return;
    }

    const score = calculateScore();

    const checkin = {
      victimId,
      date: new Date().toISOString(),
      answers,
      distressIndicator: score,
    };

    const previous =
      JSON.parse(
        localStorage.getItem(
          "samvedna_checkins"
        ) || "[]"
      );

    localStorage.setItem(
      "samvedna_checkins",
      JSON.stringify([
        ...previous,
        checkin,
      ])
    );

    setSubmitted(true);
  }

  if (submitted) {
    const score = calculateScore();

    return (
      <div className="min-h-screen bg-slate-50 p-6">

        <div className="max-w-3xl mx-auto">

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">

            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mx-auto">
              ✓
            </div>

            <h1 className="text-2xl font-bold text-center text-slate-900 mt-5">
              Check-in Completed
            </h1>

            <p className="text-center text-slate-500 mt-2">
              Thank you for completing your voluntary
              SAMVEDNA well-being check-in.
            </p>

            <div className="mt-8 p-6 rounded-2xl bg-indigo-50 border border-indigo-100 text-center">

              <p className="text-sm text-indigo-600 font-semibold">
                Current Well-being Indicator
              </p>

              <p className="text-4xl font-bold text-indigo-700 mt-2">
                {score}
              </p>

              <p className="text-xs text-slate-500 mt-2">
                Prototype indicator — not a medical diagnosis
              </p>

            </div>

            {answers.safety === "Yes" && (
              <div className="mt-5 p-5 rounded-xl bg-red-50 border border-red-200">

                <h3 className="font-bold text-red-700">
                  Human Support Recommended
                </h3>

                <p className="text-sm text-red-600 mt-2">
                  Your response indicates that you may
                  need human support. An authorized
                  support professional should review
                  this response.
                </p>

              </div>
            )}

            <div className="flex gap-3 mt-7">

              <button
                onClick={() =>
                  navigate("/victim-dashboard")
                }
                className="
                  flex-1
                  py-3
                  rounded-xl
                  bg-indigo-600
                  hover:bg-indigo-700
                  text-white
                  font-semibold
                "
              >
                Back to Dashboard
              </button>

              <button
                onClick={() =>
                  navigate("/victim-chatbot")
                }
                className="
                  flex-1
                  py-3
                  rounded-xl
                  border
                  border-indigo-200
                  text-indigo-600
                  font-semibold
                "
              >
                Open Support Chat
              </button>

            </div>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">

      <div className="max-w-3xl mx-auto">

        {/* Header */}

        <div className="mb-6">

          <button
            onClick={() =>
              navigate("/victim-dashboard")
            }
            className="text-sm text-indigo-600 font-semibold"
          >
            ← Back to Dashboard
          </button>

          <h1 className="text-3xl font-bold text-slate-900 mt-4">
            Today's Well-being Check-in
          </h1>

          <p className="text-slate-500 mt-2">
            A short voluntary check-in to understand
            how you are doing today.
          </p>

        </div>


        {/* Notice */}

        <div className="mb-6 p-4 rounded-xl bg-indigo-50 border border-indigo-100">

          <p className="text-sm text-indigo-700">
            You can skip a question or stop the check-in
            whenever you want.
          </p>

        </div>


        {/* Questions */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {dailyQuestions.map(
            (question, index) => (

              <div
                key={question.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
              >

                <div className="flex gap-3">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>

                  <div className="flex-1">

                    <h2 className="font-semibold text-slate-900">
                      {question.question}
                    </h2>

                    <div className="grid sm:grid-cols-2 gap-3 mt-4">

                      {question.options.map(
                        (option) => (

                          <button
                            key={option}
                            type="button"
                            onClick={() =>
                              handleAnswer(
                                question.id,
                                option
                              )
                            }
                            className={`
                              text-left
                              px-4
                              py-3
                              rounded-xl
                              border
                              transition
                              ${
                                answers[
                                  question.id
                                ] === option
                                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                  : "border-slate-200 hover:border-indigo-300"
                              }
                            `}
                          >
                            {option}
                          </button>

                        )
                      )}

                    </div>

                  </div>

                </div>

              </div>

            )
          )}


          <button
            type="submit"
            className="
              w-full
              py-4
              rounded-xl
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              font-bold
              shadow-lg
            "
          >
            Submit Check-in
          </button>

        </form>

      </div>

    </div>
  );
}