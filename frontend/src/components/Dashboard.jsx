import { useEffect, useState } from "react";
import { getTodayApod, getApodByDate } from "../services/api";

export default function Dashboard() {
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    fetchApod();
  }, []);

  const fetchApod = (date) => {
    setLoading(true);
    const apiCall = date ? getApodByDate(date) : getTodayApod();

    apiCall
      .then((res) => {
        setApod(res.data);
        setLoading(false);
      })
      .catch(() => {
        setApod(null);
        setLoading(false);
      });
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    fetchApod(date);
  };

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!apod) return <p style={{ textAlign: "center" }}>Failed to load APOD</p>;

  // ✅ NORMALIZE MEDIA TYPE (IMPORTANT)
  const mediaType = apod.mediaType || apod.media_type;

  return (
    <div style={{ maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>{apod.title}</h1>

      {/* Date Picker */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <label htmlFor="apod-date">Select Date: </label>
        <input
          type="date"
          id="apod-date"
          value={selectedDate}
          onChange={handleDateChange}
          max={new Date().toISOString().split("T")[0]}
        />
      </div>

      {/* MEDIA RENDERING */}
      {apod.url && mediaType === "image" && (
        <img
          src={`http://localhost:8080/api/apod/image?url=${encodeURIComponent(apod.url)}`}
          alt={apod.title}
          style={{
            width: "100%",
            borderRadius: "10px",
            display: "block"
          }}
          referrerPolicy="no-referrer"
        />
      )}

      {apod.url && mediaType === "video" && (
        apod.url.includes("youtube") ? (
          <iframe
            title="apod-video"
            src={apod.url}
            width="100%"
            height="400"
            allowFullScreen
            style={{ borderRadius: "10px" }}
          />
        ) : (
          <p>
            🎥 This APOD is a video hosted by NASA.
            <br />
            <a href={apod.url} target="_blank" rel="noopener noreferrer">
              Click here to watch the video
            </a>
          </p>
        )
      )}

      {!apod.url && (
        <p>🎨 No image or video available for this date.</p>
      )}

      <p style={{ marginTop: "20px" }}>{apod.explanation}</p>

      <p style={{ fontStyle: "italic" }}>
        Date: {apod.date}
        {apod.copyright && ` © ${apod.copyright}`}
      </p>
    </div>
  );
}
