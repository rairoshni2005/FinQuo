import React, { useEffect, useState } from "react";
import styles from "./chat.module.css";

function Chat() {
    const [results, setResults] = useState([]);
    const [username, setUsername] = useState("");
    const data = JSON.parse(localStorage.getItem("sayit-info"));

    useEffect(() => {
        if (username.trim() === "") {
            setResults([]); // Clear results if input is empty
            return;
        }

        fetch(`http://localhost:8000/users/search/${username}`, {
            method: "GET",
            headers: { Authorization: data?.token ? `Bearer ${data.token}` : "" },
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setResults(data); // Update results with fetched data
            })
            .catch((err) => {
                console.error("Error fetching users:", err);
                setResults([]); // Clear results on error
            });
    }, [username, data?.token]); // Dependencies include token for safe access

    return (
        <section className={styles.main}>
            {/* Search Box */}
            <div className={styles.searchbox}>
                <input
                    type="text"
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Search By Name"
                    className={styles.searchinput}
                />
            </div>

            {/* Search Results */}
            <div className={styles.searchresult}>
                {results.length > 0 ? (
                    results.map((user) => (
                        <div key={user.id} className={styles.result}>
                            <p>
                                {user.name} <strong>{user.username}</strong>
                            </p>
                            <button>Message</button>
                        </div>
                    ))
                ) : (
                    username && <p>No results found</p>
                )}
            </div>

            {/* Chat Box */}
            <div className={styles.chatbox}></div>
        </section>
    );
}

export default Chat;
