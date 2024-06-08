// App.jsx 
import React from 'react';
import { useEffect, useRef, useState } from "react";
import "./App.css";
import Pill from "./Pill";
import { ingredient } from './ingredients';
import axios from "axios"


function App() {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectedUserSet, setSelectedUserSet] = useState(new Set());
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [cuisine, setCuisine] = useState()
    const [type, setType] = useState()

    const [result, setResult] = useState()

    const inputRef = useRef(null);

    const cuisineList = [
        "Indian",
        "Healthy Food ",
        "Dessert",
        "Chinese ",
        "Italian",
        "Snack ",
        "Thai ",
        "French  ",
        "Mexican ",
        "Japanese",
        "Beverage",
        "Nepalese",
        "Korean",
        "Vietnames ",
        "Korean ",
        "Spanish"
    ]
    useEffect(() => {
        const fetchUsers = () => {
            setActiveSuggestion(0);
            if (searchTerm.trim() === "") {
                setSuggestions([]);
                return;
            }

            let similar = ingredient.filter((word) => word.toLowerCase().search(searchTerm.toLowerCase()) > 0)
            setSuggestions(similar);
        };

        fetchUsers();
    }, [searchTerm]);

    const handleSelectUser = (user) => {
        setSelectedUsers([...selectedUsers, user]);
        setSelectedUserSet(new Set([...selectedUserSet, user.email]));
        setSearchTerm("");
        setSuggestions([]);
        inputRef.current.focus();
    };

    const handleRemoveUser = (user) => {
        const updatedUsers = selectedUsers.filter(
            (selectedUser) => selectedUser.id !== user.id
        );
        setSelectedUsers(updatedUsers);

        const updatedEmails = new Set(selectedUserSet);
        updatedEmails.delete(user.email);
        setSelectedUserSet(updatedEmails);
    };

    const handleKeyDown = (e) => {
        if (
            e.key === "Backspace" &&
            e.target.value === "" &&
            selectedUsers.length > 0
        ) {
            const lastUser = selectedUsers[selectedUsers.length - 1];
            handleRemoveUser(lastUser);
            setSuggestions([]);
        } else if (e.key === "ArrowDown" &&
            suggestions?.users?.length > 0) {
            e.preventDefault();
            setActiveSuggestion((prevIndex) =>
                prevIndex < suggestions.users.length - 1 ?
                    prevIndex + 1 : prevIndex
            );
        } else if (e.key === "ArrowUp" &&
            suggestions?.users?.length > 0) {
            e.preventDefault();
            setActiveSuggestion((prevIndex) =>
                (prevIndex > 0 ? prevIndex - 1 : 0));
        } else if (
            e.key === "Enter" &&
            activeSuggestion >= 0 &&
            activeSuggestion < suggestions.users.length
        ) {
            handleSelectUser(suggestions.users[activeSuggestion]);
        }
    };

    return (
        <>
            <div class="main">
                <h1>Food Recommendation</h1>

                <div>
                    <h2>Whats your preference ?</h2>
                    <p>Veg or Non-Veg!</p>
                    <select onChange={(e)=>{
                        setType(e.target.value);
                    }}>
                        <option value={"non veg"}>Non Veg</option>
                        <option value={"veg"}>Veg</option>
                    </select>
                </div>

                <div>
                    <h2>Whats your cuisine ?</h2>
                    <p>Choose Your One!</p>
                    <select onChange={(e)=>{
                        setCuisine(e.target.value);
                    }}>
                        {
                            cuisineList.map((cuisine, index) => {
                                return (
                                    <option key={index} value={cuisine}>
                                        {cuisine}
                                    </option>
                                );
                            })
                        }
                    </select>
                </div>

                <div>
                    <h2>Whats ingredients do you have ?</h2>
                    <p>Choose Your Ingredients from the list!</p>
                </div>
                
            </div>
            
            <div className="user-search-container">
                <div className="user-search-input">
                    {/* Pills */}
                    {selectedUsers.map((user, index) => {
                        return (
                            <Pill
                                key={index}
                                text={`${user}`}
                                onClick={() => handleRemoveUser(user)}
                            />
                        );
                    })}
                    {/* input feild with search suggestions */}
                    <div>
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search For a User..."
                            onKeyDown={handleKeyDown}
                        />
                        {/* Search Suggestions */}
                        {searchTerm && (
                            <ul className="suggestions-list">
                                {suggestions?.map((user, index) => {
                                    return (
                                        <li
                                            className={index === activeSuggestion ?
                                                "active" : ""}
                                            key={index}
                                            onClick={() => handleSelectUser(user)}
                                        >
                                            <span>
                                                {user}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        )}
                    </div>
                </div>
            </div>
            <br />
            <br />
            <button style={{padding: 10}} onClick={(e)=>{
                axios.get(`http://localhost:5000?cuisine=${cuisine}&type=${type}&ingredients=${selectedUsers.join(",")}`).then((res)=>{
                    console.log("Response", res)
                    setResult(res.data.output)
                }).catch((err)=>{{console.log("Error", err)}})
            }}>Give Suggestion</button>
            <br /><br />
            {
                result &&
                <div>
                    <h2>Recommended Recipes</h2>
                    {
                        result?.map((recipe, index) => {
                            return (
                                    <p key={index}>{index}: {recipe}</p>
                            );
                        })
                    }
                </div>
            }
            
        </>
    );
}

export default App;
