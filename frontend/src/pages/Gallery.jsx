import { useState } from "react";
import { getApodRange } from "../services/api";

export default function Gallery() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch gallery APODs
  const fetchGallery = () => {
    if (!startDate || !endDate) return;

    setLoading(true);
    getApodRange(startDate, endDate)
      .then((res) => {
        setItems(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const renderSkeletons = () => {
  const skeletons = [];
  for (let i = 0; i < 6; i++) {
    skeletons.push(
      <div key={i} style={styles.skeletonCard}></div>
    );
  }
  return skeletons;
};


  // Modal functions
  const openModal = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setModalOpen(false);
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>🌌 APOD Gallery</h1>

      {/* Date Range Picker */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        {"  "}
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        {"  "}
        <button onClick={fetchGallery}>Load</button>
      </div>

      {/* Loading */}
      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
       {loading
  ? renderSkeletons()
  : items.map((apod, index) => {
      const mediaType = apod.mediaType || apod.media_type;
      if (mediaType !== "image") return null;

      return (
        <div
          key={index}
          style={styles.card}
          onMouseEnter={(e) =>
            (e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)")
          }
          onClick={() => openModal(apod)}
        >
          <img
            src={`http://localhost:8080/api/apod/image?url=${encodeURIComponent(
              apod.url
            )}`}
            alt={apod.title}
            style={styles.cardImage}
            referrerPolicy="no-referrer"
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
          <h4 style={styles.cardTitle}>{apod.title}</h4>
          <p style={styles.cardDate}>{apod.date}</p>
        </div>
      );
    })}

      </div>

      {/* Modal */}
      {modalOpen && selectedItem && (
        <div style={styles.modalOverlay} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <span style={styles.closeBtn} onClick={closeModal}>
              &times;
            </span>
            <img
              src={`http://localhost:8080/api/apod/image?url=${encodeURIComponent(
                selectedItem.url
              )}`}
              alt={selectedItem.title}
              style={{ width: "100%", borderRadius: "10px" }}
            />
            <h3 style={{ marginTop: "10px" }}>{selectedItem.title}</h3>
            <p style={{ color: "gray" }}>{selectedItem.date}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Styles
const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    overflow: "hidden",
    padding: "10px",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  cardImage: {
    width: "100%",
    borderRadius: "8px",
    marginBottom: "10px",
    transition: "transform 0.3s ease",
  },
  cardTitle: {
    margin: "0 0 5px 0",
    fontSize: "16px",
  },
  cardDate: {
    margin: "0",
    fontSize: "12px",
    color: "gray",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "12px",
    maxWidth: "80%",
    maxHeight: "80%",
    overflowY: "auto",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    top: "10px",
    right: "15px",
    fontSize: "24px",
    cursor: "pointer",
  },
  skeletonCard: {
  height: "300px",
  borderRadius: "12px",
  backgroundColor: "#eee",
  animation: "pulse 1.5s infinite",
},

};
