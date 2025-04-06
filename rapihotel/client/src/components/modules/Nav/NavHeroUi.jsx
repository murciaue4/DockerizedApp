export const MoonIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <path
        d="M21.53 15.93c-.16-.27-.61-.69-1.73-.49a8.46 8.46 0 01-1.88.13 8.409 8.409 0 01-5.91-2.82 8.068 8.068 0 01-1.44-8.66c.44-1.01.13-1.54-.09-1.76s-.77-.55-1.83-.11a10.318 10.318 0 00-6.32 10.21 10.475 10.475 0 007.04 8.99 10 10 0 002.89.55c.16.01.32.02.48.02a10.5 10.5 0 008.47-4.27c.67-.93.49-1.519.32-1.79z"
        fill="currentColor"
      />
    </svg>
  );
};

export const SunIcon = (props) => {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      height="1em"
      role="presentation"
      viewBox="0 0 24 24"
      width="1em"
      {...props}
    >
      <g fill="currentColor">
        <path d="M19 12a7 7 0 11-7-7 7 7 0 017 7z" />
        <path d="M12 22.96a.969.969 0 01-1-.96v-.08a1 1 0 012 0 1.038 1.038 0 01-1 1.04zm7.14-2.82a1.024 1.024 0 01-.71-.29l-.13-.13a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.984.984 0 01-.7.29zm-14.28 0a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a1 1 0 01-.7.29zM22 13h-.08a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zM2.08 13H2a1 1 0 010-2 1.038 1.038 0 011.04 1 .969.969 0 01-.96 1zm16.93-7.01a1.024 1.024 0 01-.71-.29 1 1 0 010-1.41l.13-.13a1 1 0 011.41 1.41l-.13.13a.984.984 0 01-.7.29zm-14.02 0a1.024 1.024 0 01-.71-.29l-.13-.14a1 1 0 011.41-1.41l.13.13a1 1 0 010 1.41.97.97 0 01-.7.3zM12 3.04a.969.969 0 01-1-.96V2a1 1 0 012 0 1.038 1.038 0 01-1 1.04z" />
      </g>
    </svg>
  );
};

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Switch,
} from "@heroui/react";
import { Link } from "react-router-dom";
import { loginContext } from "../../../context/loginContext";
import { useContext, useState, useEffect } from "react";

export const HotelLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export const SearchIcon = ({
  size = 24,
  strokeWidth = 1.5,
  width,
  height,
  ...props
}) => {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      focusable="false"
      height={height || size}
      role="presentation"
      viewBox="0 0 24 24"
      width={width || size}
      {...props}
    >
      <path
        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
      <path
        d="M22 22L20 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

export default function App() {
  const {
    isLogin,
    user,
    closeSession,
    imgUser,
    showAlertLogUp,
    handleFavouritesClick,
    handleSetShowAlert,
    filters,
    setFilters,
    customShooter,
  } = useContext(loginContext);

  // Lógica para el modo oscuro
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <Navbar isBordered className="z-10">
      <NavbarContent justify="start">
        <NavbarBrand className="mr-4">
          <Link to="/">
            <HotelLogo />
          </Link>
          <p className="hidden sm:block font-bold text-inherit">HotelConnect</p>
        </NavbarBrand>
        <NavbarContent className="hidden lg:flex gap-3">
          <NavbarItem>
            <Link className="text-sm" to="/maquetas" color="foreground">
              Favoritos
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-sm" to="/hoteles/post" color="foreground">
              Publicar
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-sm" to="/blank" color="foreground">
              Centro de Ayuda
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="center">
        <Input
          classNames={{
            base: "w-full h-10 lg:max-w-[20rem]",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Buscar hoteles..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
        />

        {/* Botón para alternar el modo oscuro */}
        <NavbarItem>
          <Switch
          isSelected={isDark} onValueChange={() => setIsDark(!isDark)}
            defaultSelected ={isDark}
            color="warning"
            endContent={<MoonIcon />}
            size="lg"
            startContent={<SunIcon />}
          >
          </Switch>
        </NavbarItem>

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="{user?.name || 'Usuario'}"
              size="sm"
              src={imgUser || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Opciones de perfil" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">{user ? 'Hola!': 'inicia ses'}</p>
              <p className="font-semibold">
                {user?.email || "usuario@example.com"}
              </p>
            </DropdownItem>
            <DropdownItem key="settings">
              <Link to="/profile">Mi cuenta</Link>
            </DropdownItem>
            <DropdownItem key="bookings">Mis Reservas</DropdownItem>
            <DropdownItem key="analytics">Estadísticas</DropdownItem>
            <DropdownItem key="help_and_feedback">
              <span>Ayuda y Feedback</span>
            </DropdownItem>
            <DropdownItem key="logout" color="danger">
             {isLogin ? (
                <button
                  onClick={() => {
                    closeSession();
                    handleSetShowAlert(true, "Sesión cerrada", "success");
                  }}
                >
                  Cerrar sesión
                </button>
              ) : (
                <Link to="/login">Iniciar sesión</Link>
              )}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  );
}
