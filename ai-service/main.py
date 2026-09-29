from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI(title="SAMVEDNA AI Service")

emotion_classifier = pipeline(
    "text-classification",
    model="j-hartmann/emotion-english-distilroberta-base",
    top_k=None
)


class TextRequest(BaseModel):
    text: str


@app.get("/health")
def health():
    return {
        "success": True,
        "message": "SAMVEDNA AI service is running"
    }


@app.post("/analyze-text")
def analyze_text(request: TextRequest):

    text = request.text.strip()

    if not text:
        return {
            "success": False,
            "message": "Text is required"
        }

    results = emotion_classifier(text)[0]

    results = sorted(
        results,
        key=lambda x: x["score"],
        reverse=True
    )

    top_emotion = results[0]

    return {
        "success": True,
        "text": text,
        "emotion": top_emotion["label"],
        "confidence": round(top_emotion["score"], 4),
        "emotions": results
    }