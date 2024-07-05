import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faPersonCircleQuestion,
  faPersonCirclePlus,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const response = {
  loggedIn: false,
};

const NavBar = () => {
  const itemsRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [itemsRef]);

  function handleClickOutside(event) {
    if (itemsRef.current && !itemsRef.current.contains(event.target)) {
      setProfileClicked(false);
      setHamburgerClicked(false);
    }
  }
  const [profileClicked, setProfileClicked] = useState(false);
  const [hamburgerClicked, setHamburgerClicked] = useState(false);
  return (
    <div className="w-screen flex  shadow-lg justify-between items-center p-4">
      {/* Logo for laptop screens */}
      <Link to="/" className="md:inline cursor-pointer hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 187 40"
        >
          <path
            fill="#3A724F"
            fill-rule="evenodd"
            d="M19.87 4.567 22.507 0l7.476 4.317-2.636 4.566c-.463.801.23 1.775 1.138 1.6l5.052-.975 1.635 8.477-5.052.974c-8.172 1.576-14.411-7.184-10.25-14.392Z"
            clip-rule="evenodd"
          ></path>
          <path
            fill="#DC8E43"
            fill-rule="evenodd"
            d="M15.302 35.433 12.665 40l-7.477-4.316 2.637-4.567c.463-.801-.23-1.775-1.139-1.6l-5.051.974L0 22.015l5.052-.974c8.172-1.576 14.41 7.184 10.25 14.392Z"
            clip-rule="evenodd"
          ></path>
          <path
            fill="#14424C"
            fill-rule="evenodd"
            d="M15.53 4.567 12.894 0 5.417 4.317l2.637 4.566c.462.801-.23 1.775-1.139 1.6l-5.052-.975L.23 17.985l5.051.974c8.173 1.576 14.412-7.184 10.25-14.392Z"
            clip-rule="evenodd"
          ></path>
          <path
            fill="#C85D1B"
            fill-rule="evenodd"
            d="M19.65 35.433 22.285 40l7.477-4.316-2.637-4.567c-.462-.801.23-1.775 1.139-1.6l5.051.974 1.635-8.476-5.052-.974c-8.172-1.576-14.41 7.184-10.25 14.392Z"
            clip-rule="evenodd"
          ></path>
          <path
            fill="#14424C"
            d="M163.114 30.153v-8.5c0-1.178.271-2.235.813-3.17.561-.954 1.356-1.702 2.385-2.245 1.029-.542 2.254-.813 3.675-.813a7.23 7.23 0 0 1 1.964.252c.599.15 1.141.365 1.627.645.505.262.935.58 1.291.954h.056a5.5 5.5 0 0 1 1.29-.954 6.772 6.772 0 0 1 1.656-.645 7.541 7.541 0 0 1 1.992-.252c1.421 0 2.646.27 3.675.813 1.028.543 1.823 1.29 2.384 2.245.562.935.842 1.991.842 3.17v8.5h-4.377v-8.36c0-.467-.121-.888-.364-1.262a2.663 2.663 0 0 0-.926-.954 2.508 2.508 0 0 0-1.347-.365c-.505 0-.963.122-1.374.365a2.654 2.654 0 0 0-.926.954 2.4 2.4 0 0 0-.337 1.262v8.36h-4.348v-8.36c0-.467-.122-.888-.365-1.262a2.585 2.585 0 0 0-.954-.954 2.508 2.508 0 0 0-1.347-.365c-.505 0-.963.122-1.374.365a2.654 2.654 0 0 0-.926.954 2.41 2.41 0 0 0-.337 1.262v8.36h-4.348ZM153.603 30.49c-1.477 0-2.759-.28-3.843-.842-1.066-.58-1.889-1.356-2.469-2.328-.58-.991-.87-2.086-.87-3.283v-8.276h4.349v8.164c0 .505.121.973.364 1.403.243.411.571.748.982 1.01.43.243.917.365 1.459.365.524 0 .991-.122 1.403-.365.43-.262.767-.599 1.01-1.01.243-.43.365-.898.365-1.403v-8.164h4.348v8.276c0 1.197-.281 2.292-.842 3.283-.561.972-1.374 1.749-2.44 2.328-1.048.561-2.32.842-3.816.842ZM132.414 30.153v-3.45h6.93c.187 0 .355-.038.505-.113.149-.093.271-.215.364-.364a.93.93 0 0 0 0-.982.9.9 0 0 0-.364-.337.934.934 0 0 0-.505-.14h-2.525c-.936 0-1.787-.15-2.553-.449a4.052 4.052 0 0 1-1.796-1.459c-.43-.673-.645-1.543-.645-2.609 0-.823.196-1.571.589-2.244a4.76 4.76 0 0 1 1.655-1.628 4.568 4.568 0 0 1 2.329-.617h6.929v3.479h-6.256a.97.97 0 0 0-.673.253.841.841 0 0 0-.253.617c0 .262.085.486.253.673a.97.97 0 0 0 .673.253h2.469c1.047 0 1.945.159 2.693.476.767.3 1.356.786 1.768 1.46.43.673.645 1.542.645 2.608 0 .842-.215 1.609-.645 2.3a4.613 4.613 0 0 1-1.684 1.656c-.692.412-1.477.617-2.356.617h-7.547ZM122.94 15.425c1.216 0 2.291.196 3.226.589a6.41 6.41 0 0 1 2.413 1.627 6.993 6.993 0 0 1 1.543 2.469c.355.935.533 1.973.533 3.114 0 1.421-.299 2.684-.898 3.787a6.471 6.471 0 0 1-2.412 2.553c-1.029.617-2.226.926-3.591.926-.58 0-1.132-.075-1.656-.224a5.312 5.312 0 0 1-1.402-.646 3.9 3.9 0 0 1-1.038-1.038h-.085v7.66h-4.348V23.223c0-1.59.318-2.965.954-4.124a6.666 6.666 0 0 1 2.693-2.694c1.16-.654 2.516-.981 4.068-.981Zm0 3.759c-.673 0-1.262.168-1.767.505-.487.318-.861.767-1.123 1.347-.261.56-.392 1.197-.392 1.907 0 .711.131 1.347.392 1.908.262.561.636 1.01 1.123 1.347.505.318 1.094.477 1.767.477.673 0 1.253-.16 1.739-.477a3.297 3.297 0 0 0 1.123-1.347c.28-.561.42-1.197.42-1.908 0-.71-.14-1.346-.42-1.907-.262-.58-.636-1.03-1.123-1.347-.486-.337-1.066-.505-1.739-.505ZM108.617 30.153V15.761h4.377v14.392h-4.377Zm2.188-16.019c-.692 0-1.29-.252-1.795-.757-.505-.505-.758-1.104-.758-1.796s.253-1.29.758-1.795c.505-.524 1.103-.786 1.795-.786s1.291.262 1.796.786c.505.505.757 1.103.757 1.795s-.252 1.29-.757 1.796c-.505.505-1.104.757-1.796.757ZM99.105 30.49c-1.477 0-2.805-.327-3.984-.982a7.462 7.462 0 0 1-2.805-2.693c-.673-1.141-1.01-2.422-1.01-3.844 0-1.44.337-2.721 1.01-3.843a7.462 7.462 0 0 1 2.805-2.693c1.179-.674 2.507-1.01 3.984-1.01 1.478 0 2.796.336 3.956 1.01a7.25 7.25 0 0 1 2.777 2.693c.692 1.122 1.038 2.403 1.038 3.843 0 1.422-.346 2.703-1.038 3.844a7.25 7.25 0 0 1-2.777 2.693c-1.178.655-2.497.982-3.956.982Zm0-3.787c.692 0 1.291-.169 1.796-.505a3.424 3.424 0 0 0 1.178-1.347c.281-.561.421-1.197.421-1.908 0-.692-.14-1.318-.421-1.88a3.423 3.423 0 0 0-1.178-1.346c-.505-.337-1.104-.505-1.796-.505s-1.3.168-1.823.505a3.428 3.428 0 0 0-1.179 1.347 4.144 4.144 0 0 0-.42 1.88c0 .71.14 1.346.42 1.907a3.43 3.43 0 0 0 1.179 1.347c.523.336 1.131.505 1.823.505ZM77.174 35.849v-3.732h7.181c.281 0 .515-.093.702-.28a.83.83 0 0 0 .28-.646v-3.17h-.084a6.59 6.59 0 0 1-1.206 1.094c-.412.3-.88.524-1.403.674a6.023 6.023 0 0 1-1.711.224c-1.272 0-2.413-.3-3.423-.898-.991-.617-1.777-1.468-2.357-2.553-.56-1.084-.841-2.319-.841-3.703 0-1.365.29-2.609.87-3.731.598-1.122 1.468-2.02 2.609-2.693 1.14-.674 2.534-1.01 4.18-1.01 1.571 0 2.927.327 4.068.982a6.624 6.624 0 0 1 2.693 2.72c.636 1.16.954 2.526.954 4.097v8.416c0 1.29-.383 2.31-1.15 3.058-.748.767-1.786 1.15-3.114 1.15h-8.248Zm4.825-9.483c.673 0 1.253-.15 1.74-.449a3.18 3.18 0 0 0 1.121-1.262 3.834 3.834 0 0 0 .393-1.74c0-.673-.13-1.29-.392-1.851-.262-.561-.636-1.001-1.123-1.319-.486-.337-1.066-.505-1.74-.505-.654 0-1.234.159-1.739.477-.486.318-.86.748-1.122 1.29-.261.543-.392 1.15-.392 1.824 0 .655.13 1.253.392 1.796.262.523.636.944 1.123 1.262.504.318 1.084.477 1.739.477ZM65.473 30.49c-1.477 0-2.805-.327-3.983-.982a7.46 7.46 0 0 1-2.806-2.693c-.673-1.141-1.01-2.422-1.01-3.844 0-1.44.337-2.721 1.01-3.843a7.46 7.46 0 0 1 2.806-2.693c1.178-.674 2.506-1.01 3.983-1.01 1.478 0 2.796.336 3.956 1.01a7.252 7.252 0 0 1 2.777 2.693c.692 1.122 1.038 2.403 1.038 3.843 0 1.422-.346 2.703-1.038 3.844a7.252 7.252 0 0 1-2.777 2.693c-1.178.655-2.497.982-3.956.982Zm0-3.787c.692 0 1.29-.169 1.796-.505a3.43 3.43 0 0 0 1.178-1.347c.28-.561.42-1.197.42-1.908 0-.692-.14-1.318-.42-1.88a3.429 3.429 0 0 0-1.178-1.346c-.505-.337-1.104-.505-1.796-.505s-1.3.168-1.823.505a3.428 3.428 0 0 0-1.179 1.347 4.145 4.145 0 0 0-.42 1.88c0 .71.14 1.346.42 1.907a3.43 3.43 0 0 0 1.179 1.347c.523.336 1.131.505 1.823.505ZM51.547 30.153c-1.216 0-2.282-.27-3.198-.813a5.763 5.763 0 0 1-2.132-2.16c-.505-.898-.758-1.89-.758-2.974V10.515h4.713v14.027c0 .45.16.842.477 1.179.318.336.71.505 1.178.505h5.19v3.927h-5.47Z"
          ></path>
        </svg>
      </Link>

      {/* Logo for mobile screens */}
      <Link to="/" className="md:hidden cursor-pointer inline">
        <svg
          width="70"
          height="70"
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M80 40C80 62.0914 62.0914 80 40 80C17.9086 80 0 62.0914 0 40C0 17.9086 17.9086 0 40 0C62.0914 0 80 17.9086 80 40Z"
            fill="#1D2633"
          ></path>
          <path
            d="M69.7136 50.2133C71.0644 50.2133 72.0252 51.5261 71.5172 52.7777C66.4666 65.2233 54.2582 74 39.9999 74C25.7417 74 13.5333 65.2233 8.48263 52.7777C7.97466 51.5261 8.93548 50.2133 10.2863 50.2133H69.7136Z"
            fill="#EDEBDE"
          ></path>
          <path
            d="M71.5172 27.2222C72.0252 28.4739 71.0644 29.7867 69.7136 29.7867H10.2863C8.93549 29.7867 7.97468 28.4739 8.48264 27.2222C13.5333 14.7767 25.7417 6 39.9999 6C54.2582 6 66.4665 14.7767 71.5172 27.2222Z"
            fill="#EDEBDE"
          ></path>
          <path
            d="M69.837 37.1499C72.0842 37.1499 73.1686 38.7177 73.1686 40.5337V43.9437H70.8169V40.9388C70.8169 40.1157 70.5164 39.4363 69.6541 39.4363C68.7918 39.4363 68.5044 40.1157 68.5044 40.9388V43.9437H66.1527V40.9388C66.1527 40.1157 65.8653 39.4363 65.003 39.4363C64.1407 39.4363 63.8402 40.1157 63.8402 40.9388V43.9437H61.4885V40.5337C61.4885 38.7177 62.5729 37.1499 64.8201 37.1499C66.0482 37.1499 66.9366 37.6333 67.3416 38.4303C67.7728 37.6333 68.7135 37.1499 69.837 37.1499Z"
            fill="#EDEBDE"
          ></path>
          <path
            d="M57.2627 41.8533C58.0205 41.8533 58.3471 41.1609 58.3471 40.3378V37.4112H60.6988V40.6252C60.6988 42.5457 59.5752 44.1397 57.2627 44.1397C54.9502 44.1397 53.8267 42.5457 53.8267 40.6252V37.4112H56.1783V40.3378C56.1783 41.1609 56.505 41.8533 57.2627 41.8533Z"
            fill="#EDEBDE"
          ></path>
          <path
            d="M50.3687 44.1527C48.8924 44.1527 47.9386 43.6432 47.3769 42.6503L49.0753 41.6965C49.3105 42.1146 49.6632 42.3236 50.2511 42.3236C50.7345 42.3236 50.9566 42.1538 50.9566 41.9448C50.9566 41.1478 47.5075 41.9578 47.5075 39.4232C47.5075 38.1951 48.5527 37.2022 50.3295 37.2022C51.8843 37.2022 52.7335 37.9599 53.1124 38.6916L51.4139 39.6584C51.2702 39.2664 50.826 39.0313 50.3818 39.0313C50.0421 39.0313 49.8592 39.175 49.8592 39.371C49.8592 40.181 53.3083 39.4363 53.3083 41.8925C53.3083 43.2643 51.9627 44.1527 50.3687 44.1527Z"
            fill="#EDEBDE"
          ></path>
          <path
            d="M42.1524 46.9486H39.8007V40.6644C39.8007 38.6655 41.3032 37.2152 43.3936 37.2152C45.4317 37.2152 46.9864 38.77 46.9864 40.6644C46.9864 42.7548 45.6016 44.1397 43.5242 44.1397C43.0408 44.1397 42.5574 43.996 42.1524 43.7738V46.9486ZM43.3936 41.9317C44.1383 41.9317 44.6347 41.3568 44.6347 40.6775C44.6347 39.985 44.1383 39.4232 43.3936 39.4232C42.6489 39.4232 42.1524 39.985 42.1524 40.6775C42.1524 41.3568 42.6489 41.9317 43.3936 41.9317Z"
            fill="#EDEBDE"
          ></path>
          <path
            d="M37.4449 36.7188C36.6741 36.7188 36.0339 36.0786 36.0339 35.3078C36.0339 34.5369 36.6741 33.8967 37.4449 33.8967C38.2158 33.8967 38.856 34.5369 38.856 35.3078C38.856 36.0786 38.2158 36.7188 37.4449 36.7188ZM36.2691 37.4112H38.6208V43.9437H36.2691V37.4112Z"
            fill="#EDEBDE"
          ></path>
          <path
            d="M31.7571 44.1397C29.719 44.1397 28.1642 42.5719 28.1642 40.6644C28.1642 38.77 29.719 37.2022 31.7571 37.2022C33.7952 37.2022 35.35 38.77 35.35 40.6644C35.35 42.5719 33.7952 44.1397 31.7571 44.1397ZM31.7571 41.9317C32.5018 41.9317 32.9983 41.3568 32.9983 40.6775C32.9983 39.985 32.5018 39.4102 31.7571 39.4102C31.0124 39.4102 30.5159 39.985 30.5159 40.6775C30.5159 41.3568 31.0124 41.9317 31.7571 41.9317Z"
            fill="#EDEBDE"
          ></path>
          <path
            d="M23.7237 47.1446C22.1036 47.1446 20.9278 46.426 20.3268 45.1457L22.2735 44.1005C22.4825 44.5447 22.8745 45.002 23.6845 45.002C24.5337 45.002 25.0955 44.4663 25.1608 43.5256C24.8473 43.8 24.3508 44.009 23.6061 44.009C21.7901 44.009 20.3268 42.6111 20.3268 40.6513C20.3268 38.7569 21.8815 37.2152 23.9197 37.2152C26.01 37.2152 27.5125 38.6655 27.5125 40.6644V43.2513C27.5125 45.6029 25.8794 47.1446 23.7237 47.1446ZM23.8805 41.801C24.586 41.801 25.1216 41.3176 25.1216 40.5991C25.1216 39.8936 24.586 39.4232 23.8805 39.4232C23.188 39.4232 22.6393 39.8936 22.6393 40.5991C22.6393 41.3176 23.188 41.801 23.8805 41.801Z"
            fill="#EDEBDE"
          ></path>
          <path
            d="M16.3374 44.1397C14.2993 44.1397 12.7445 42.5719 12.7445 40.6644C12.7445 38.77 14.2993 37.2022 16.3374 37.2022C18.3755 37.2022 19.9303 38.77 19.9303 40.6644C19.9303 42.5719 18.3755 44.1397 16.3374 44.1397ZM16.3374 41.9317C17.0821 41.9317 17.5786 41.3568 17.5786 40.6775C17.5786 39.985 17.0821 39.4102 16.3374 39.4102C15.5927 39.4102 15.0962 39.985 15.0962 40.6775C15.0962 41.3568 15.5927 41.9317 16.3374 41.9317Z"
            fill="#EDEBDE"
          ></path>
          <path
            d="M8.46218 35.1249V41.7227H12.3555V43.9437H8.13556C6.64615 43.9437 6.04517 43.1598 6.04517 41.9186V35.1249H8.46218Z"
            fill="#EDEBDE"
          ></path>
          <path
            d="M33.9999 6.52774C35.9476 6.18095 37.9526 6 40 6C42.0473 6 44.0523 6.18095 45.9999 6.52773V29.7867H33.9999V6.52774Z"
            fill="#AC2828"
          ></path>
          <path
            d="M46.0004 50.2133H33.9993C33.9741 55.4312 33.0234 60.6038 31.1909 65.4906L28.7185 72.0836C32.2486 73.3249 36.0454 74 39.9999 74C43.9543 74 47.7511 73.3249 51.2812 72.0836L48.8088 65.4906C46.9763 60.6038 46.0256 55.4312 46.0004 50.2133Z"
            fill="#AC2828"
          ></path>
          <path
            d="M46 6.52771C50.3408 7.3006 54.3967 8.89722 58 11.1502V29.7867H46V6.52771Z"
            fill="#306A9F"
          ></path>
          <path
            d="M51.2813 72.0836C56.7387 70.1647 61.5589 66.8928 65.3391 62.6704L64.7492 62.295C60.6056 59.6581 58.073 55.1147 58.0015 50.2133H46.0005C46.0257 55.4312 46.9764 60.6038 48.809 65.4906L51.2813 72.0836Z"
            fill="#306A9F"
          ></path>
          <path
            d="M21.9999 11.1502C25.6032 8.89723 29.659 7.3006 33.9999 6.52771V29.7867H21.9999V11.1502Z"
            fill="#DEB038"
          ></path>
          <path
            d="M21.9983 50.2133H33.9993C33.9742 55.4089 33.0315 60.5596 31.2143 65.428L28.7185 72.0836C23.261 70.1647 18.4409 66.8928 14.6606 62.6704L15.2505 62.295C19.3941 59.6581 21.9268 55.1147 21.9983 50.2133Z"
            fill="#DEB038"
          ></path>
        </svg>
      </Link>

      {/* Links in the right for laptops */}
      <div className="hidden md:flex items-center gap-4">
        <ul className="flex  gap-2">
          <Link to="/">
            <li className="px-4 py-2 text-[1.2rem] font-bold rounded hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              Lost
            </li>
          </Link>
          <Link to="/">
            <li className="px-4 py-2 text-[1.2rem] font-bold rounded hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
              Found
            </li>
          </Link>
        </ul>
        {/* Default Profile image if logged in and no image URL*/}
        {response.loggedIn && !response.imgURL && (
          <div onClick={() => setProfileClicked(!profileClicked)}>
            <img
              className="h-[6vh] cursor-pointer border-2 p-1 rounded-full  border-gray-400"
              src="https://avatar.iran.liara.run/public/boy?username=Ash"
            />
          </div>
        )}
        {/* Profile Image if logged in and there is image URL*/}
        {response.loggedIn && response.imgURL && (
          <div onClick={() => setProfileClicked(!profileClicked)}>
            <img
              className="h-[6vh] cursor-pointer border-2 p-1 rounded-full  border-gray-400"
              src={response.imgURL}
            />
          </div>
        )}
        {/* If not logged in*/}
        {!response.loggedIn && (
          <div>
            <Link
              to="/login"
              className=" cursor-pointer border-2 py-2 px-4 font-semibold rounded text-[1.2rem] hover:bg-gray-900/10 active:bg-gray-900/20 border-gray-300"
            >
              {" "}
              Login{" "}
            </Link>
          </div>
        )}
        {profileClicked && (
          <ul
            ref={itemsRef}
            className="flex absolute top-[12%] right-5 p-2 flex-col justify-center items-center bg-white shadow-lg gap-2"
          >
            <Link to="/">
              <li className="px-4 py-2 text-[1.2rem] font-bold rounded hover:bg-gray-900/10 active:bg-gray-900/20 flex gap-2 items-center justify-center disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                <FontAwesomeIcon icon={faUser} /> Profile
              </li>
            </Link>
            <Link to="/">
              <li className="px-4 py-2 text-[1.2rem] font-bold rounded hover:bg-gray-900/10 active:bg-gray-900/20 flex gap-2 items-center justify-center disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                <FontAwesomeIcon icon={faArrowRightFromBracket} /> Log Out
              </li>
            </Link>
          </ul>
        )}
      </div>

      {/* Links in the right for mobile screens */}
      <div className="flex md:hidden items-center gap-4">
        {/* Default Profile image if logged in and no image URL*/}
        {response.loggedIn && !response.imgURL && (
          <div onClick={() => setHamburgerClicked(!hamburgerClicked)}>
            <img
              className="h-[6vh] cursor-pointer border-2 p-1 rounded-full  border-gray-400"
              src="https://avatar.iran.liara.run/public/boy?username=Ash"
            />
          </div>
        )}
        {/* Profile Image if logged in and there is image URL*/}
        {response.loggedIn && response.imgURL && (
          <div onClick={() => setHamburgerClicked(!hamburgerClicked)}>
            <img
              className="h-[6vh] cursor-pointer border-2 p-1 rounded-full  border-gray-400"
              src={response.imgURL}
            />
          </div>
        )}
        {/* If not logged in */}
        {!response.loggedIn && (
          <div>
            <button
              onClick={() => setHamburgerClicked(!hamburgerClicked)}
              className=" cursor-pointer border-2 py-2 px-4 font-semibold rounded text-[1.2rem] hover:bg-gray-900/10 active:bg-gray-900/20 border-gray-300"
            >
              {" "}
              <FontAwesomeIcon icon={faBars} />{" "}
            </button>
          </div>
        )}
        {!hamburgerClicked && (
          <ul
            ref={itemsRef}
            className="flex absolute top-[12%] right-5 p-2  flex-col justify-center bg-white shadow-lg gap-2"
          >
            <Link
              className="px-4 py-2 text-[1.2rem] font-bold rounded hover:bg-gray-900/10 active:bg-gray-900/20 flex gap-2 items-center justify-between disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              to="/"
            >
              <li>
                <FontAwesomeIcon icon={faPersonCircleQuestion} /> Lost
              </li>
            </Link>
            <Link
              className="px-4 py-2 text-[1.2rem] font-bold rounded hover:bg-gray-900/10 active:bg-gray-900/20 flex gap-2 items-center justify-between disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              to="/"
            >
              <li>
                <FontAwesomeIcon icon={faPersonCirclePlus} /> Found
              </li>
            </Link>
            {response.loggedIn && (
              <Link
                className="px-4 py-2 text-[1.2rem] font-bold rounded hover:bg-gray-900/10 active:bg-gray-900/20 flex gap-2 items-center justify-between disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                to="/"
              >
                <li>
                  <FontAwesomeIcon icon={faUser} /> Profile
                </li>
              </Link>
            )}
            {response.loggedIn && (
              <Link
                className="px-4 py-2 text-[1.2rem] font-bold rounded hover:bg-gray-900/10 active:bg-gray-900/20 flex gap-2 items-center justify-between disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                to="/"
              >
                <li>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} /> Log Out
                </li>
              </Link>
            )}
            {!response.loggedIn && (
              <Link
                className="px-4 py-2 text-[1.2rem] font-bold rounded hover:bg-gray-900/10 active:bg-gray-900/20 flex gap-2 items-center justify-between disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                to="/"
              >
                <li>
                  <FontAwesomeIcon icon={faArrowRightToBracket} /> Log In
                </li>
              </Link>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NavBar;
