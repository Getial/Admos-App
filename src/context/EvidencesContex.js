import React, { useState, createContext } from "react";

export const EvidencesContext = createContext({
  images: [],
  setEvidences: () => {},
  setEditedEvidence: () => {},
});

export function EvidencesProvider(props) {
  const { children } = props;
  const [images, setImages] = useState(undefined);

  const setEvidences = async (evidences) => {
    setImages(evidences);
  };

  const setEditedEvidence = async () => {
    const newlist = images.map((img) => {
      console.log("imagen==>", img);
      if (img.uri === uri) {
        img.uri = newUri;
      }
    });
    setImages(newlist);
  };

  const valueContext = {
    images,
    setEvidences,
    setEditedEvidence,
  };

  return (
    <EvidencesContext.Provider value={valueContext}>
      {children}
    </EvidencesContext.Provider>
  );
}
