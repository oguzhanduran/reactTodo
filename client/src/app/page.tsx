"use client";
import React, { useEffect, useState } from "react";

interface Data {
  message: string;
  people: string[];
}

function Home() {
  const [message, setMessage] = useState<string>("");
  const [people, setPeople] = useState<string[]>([]);

  async function fetchData() {
    const res = await fetch("http://localhost:8080/api/home");
    const data = await res.json();
    console.log("data", data.message);
    setMessage(data.message);
    setPeople(data.people);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <p>{message}</p>
      {people.map((person, index) => (
        <div key={index}>{person}</div>
      ))}
    </div>
  );
}

export default Home;
