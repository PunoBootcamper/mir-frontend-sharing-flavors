import React from "react";

interface FavoriteIconProps {
  isFavorite: boolean;
  onClick: () => void;
}

const FavoriteIcon: React.FC<FavoriteIconProps> = ({ isFavorite, onClick }) => {
  return (
    <button onClick={onClick} aria-label="Toggle Favorite">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40px"
        height="40px"
        viewBox="0 0 1280.000000 1133.000000"
        fill={isFavorite ? "#FF0000" : "#FFFFFF"} // Cambia el color según el estado
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,1133.000000) scale(0.100000,-0.100000)"
          stroke="none"
        >
          <path d="M3139 11319 c-408 -27 -834 -123 -1165 -260 -251 -104 -542 -274 -744 -435 -119 -95 -371 -349 -470 -474 -503 -634 -784 -1509 -757 -2360 10 -290 39 -472 113 -703 202 -627 670 -1387 1430 -2323 1102 -1358 2896 -3120 4835 -4751 17 -14 -8 -34 379 296 1471 1256 2963 2699 3971 3841 1131 1281 1811 2338 2000 3105 114 466 84 1111 -81 1694 -109 385 -294 773 -520 1088 -470 656 -1180 1085 -2040 1232 -257 44 -402 55 -730 55 -337 0 -452 -10 -695 -59 -722 -146 -1301 -530 -1717 -1140 -199 -291 -327 -559 -467 -973 -42 -123 -80 -224 -86 -224 -5 0 -40 78 -76 173 -159 420 -305 705 -516 1006 -267 382 -631 711 -1003 907 -478 252 -1010 349 -1661 305z" />
        </g>
      </svg>
    </button>
  );
};

export default FavoriteIcon;
