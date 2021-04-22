import {
  faUser,
  faBarcode,
  faSignInAlt,
  faSignOutAlt,
  faFileUpload,
  faShoppingBasket,
  faPlus,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";

// const Logout = () => {
//   return (
//     <embed>
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-6 w-6"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//       />
//     </svg>
//     </embed>
//   );
// };

// const Login = () => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       class="h-6 w-6"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         stroke-linecap="round"
//         stroke-linejoin="round"
//         stroke-width="2"
//         d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
//       />
//     </svg>
//   );
// };

// const Bag = () => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
//       />
//     </svg>
//   );
// }

// const Upload = () => {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-6 w-6"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
//       />
//     </svg>
//   );
// }

const navbarIcons = {
  user: faUser,
  logout: faSignOutAlt,
  login: faSignInAlt,
  upload: faFileUpload,
  bag: faShoppingBasket,
  barcode: faBarcode,
  add: faPlus,
  signup: faUserPlus
};

export default navbarIcons;
