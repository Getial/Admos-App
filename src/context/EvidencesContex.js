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

  const setEditedEvidence = async (url, newUrl) => {
    const newList = [];
    images.forEach((element) => {
      if (element.uri === url) {
        element.uri = newUrl;
      }
      newList.push(element);
    });
    setImages(newList);
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
