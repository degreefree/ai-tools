import logo from "./logo.svg";
import "./App.css";
import Highlight from "./components/Highlight";
import Podcast from "./components/Podcast";
import { useState } from "react";
import ShowNotes from "./components/ShowNotes";
import Promo from "./components/Promo";

function App() {
  const [showForm, setShowForm] = useState("shownotes");

  return (
    <div className="App flex flex-col justify-center items-center min-h-screen">
      <nav className="bg-white dark:bg-gray-900 static w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600 sm: fixed md:fixed lg:fixed">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center" href="/">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              DF AI Tools
            </span>
          </a>
          <div className="flex md:order-2">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Contact
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li
                onClick={() => {
                  setShowForm("highlights");
                }}
              >
                <b className="text-white" aria-current="page">
                  Highlights
                </b>
              </li>

              <li
                onClick={() => {
                  setShowForm("podcast");
                }}
              >
                <b className="text-white">Podcast</b>
              </li>
              <li
                onClick={() => {
                  setShowForm("showNotes");
                }}
              >
                <b className="text-white">Show Notes</b>
              </li>
              <li
                onClick={() => {
                  setShowForm("promo");
                }}
              >
                <b className="text-white">Promo Video</b>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="min-w-min main-content mt-5 flex flex-col md:flex-row items-center lg:flex-row">
        {showForm === "highlights" ? (
          <Highlight />
        ) : showForm === "podcast" ? (
          <Podcast />
        ) : showForm === "promo" ? (
          <Promo />
        ) : (
          <ShowNotes />
        )}
      </div>
    </div>
  );
}

export default App;
