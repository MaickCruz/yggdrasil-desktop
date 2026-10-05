import { useEffect, useRef, useState } from "react"
import { NavLink, Outlet } from "react-router-dom"

import {
    LuBox,
    LuBoxes,
    LuChartColumn,
    LuChevronDown,
    LuLogOut,
    LuPackagePlus,
    LuSettings,
    LuShoppingCart,
    LuUser
} from "react-icons/lu"

import useAuth from "../../hooks/UseAuth"
import RequireRole from "../RequireRole"

import "./MainLayout.css"


function SidebarIcon({ collapsed }) {
    return (
        <svg
            width="19"
            height="19"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <rect
                x="3"
                y="4"
                width="18"
                height="16"
                rx="2"
                stroke="currentColor"
                strokeWidth="1.7"
            />

            <path
                d="M9 4V20"
                stroke="currentColor"
                strokeWidth="1.7"
            />

            {collapsed ? (
                <path
                    d="M13 9L16 12L13 15"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            ) : (
                <path
                    d="M16 9L13 12L16 15"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            )}
        </svg>
    )
}


function MainLayout() {

    const { currentUser } = useAuth()

    const [userMenuOpen, setUserMenuOpen] = useState(false)
    const [collapsed, setCollapsed] = useState(false)

    const userMenuRef = useRef(null)

    const roleLabels = {
        ADMIN: "Administrador",
        MANAGER: "Gerente",
        SALESPERSON: "Vendedor"
    }

    useEffect(() => {

        function handleClickOutside(event) {

            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target)
            ) {
                setUserMenuOpen(false)
            }

        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }

    }, [])


    useEffect(() => {

        function handleResize() {
            if (window.innerWidth <= 1000) {
                setCollapsed(true)
            }
        }

        handleResize()

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }

    }, [])


    async function handleLogout() {

        try {

            await fetch("http://localhost:8080/auth/logout", {
                method: "POST",
                credentials: "include"
            })

        } catch (error) {

            console.error("Logout error:", error)

        } finally {

            window.location.href = "/login"

        }

    }


    function getInitials(name) {

        if (!name) {
            return ""
        }

        return name
            .split(" ")
            .slice(0, 2)
            .map(word => word[0])
            .join("")
            .toUpperCase()

    }


    return (
        <div className="main-layout">

            <aside
                className={`sidebar ${collapsed ? "collapsed" : ""}`}
            >

                <div className="sidebar-header">

                    <NavLink
                        to="/"
                        className="brand-link"
                    >
                        <span className="brand-name">
                            Yggdrasil
                        </span>
                    </NavLink>

                    <button
                        type="button"
                        className="sidebar-toggle"
                        onClick={() => setCollapsed(prev => !prev)}
                        aria-label={
                            collapsed
                                ? "Expandir sidebar"
                                : "Recolher sidebar"
                        }
                    >
                        <SidebarIcon collapsed={collapsed} />
                    </button>

                </div>


                <div className="sidebar-action">

                    <NavLink
                        to="/sales/new"
                        className="new-sale-button"
                        title="Registrar venda"
                    >

                        <span className="new-sale-icon">
                            <LuPackagePlus />
                        </span>

                        <span className="new-sale-label">
                            Registrar venda
                        </span>

                    </NavLink>

                </div>


                <nav className="sidebar-navigation">

                    <span className="navigation-label">
                        Gestão
                    </span>


                    <NavLink
                        to="/products"
                        title={collapsed ? "Produtos" : ""}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >

                        <span className="link-icon">
                            <LuBox />
                        </span>

                        <span className="link-label">
                            Produtos
                        </span>

                    </NavLink>


                    <NavLink
                        to="/inventory"
                        title={collapsed ? "Estoque" : ""}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >

                        <span className="link-icon">
                            <LuBoxes />
                        </span>

                        <span className="link-label">
                            Estoque
                        </span>

                    </NavLink>


                    <NavLink
                        to="/sales"
                        title={collapsed ? "Vendas" : ""}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? "active" : ""}`
                        }
                    >

                        <span className="link-icon">
                            <LuShoppingCart />
                        </span>

                        <span className="link-label">
                            Vendas
                        </span>

                    </NavLink>


                    <RequireRole role="MANAGER">

                        <NavLink
                            to="/dashboards"
                            title={collapsed ? "Relatórios" : ""}
                            className={({ isActive }) =>
                                `sidebar-link ${isActive ? "active" : ""}`
                            }
                        >

                            <span className="link-icon">
                                <LuChartColumn />
                            </span>

                            <span className="link-label">
                                Relatórios
                            </span>

                        </NavLink>

                    </RequireRole>

                </nav>


                <div
                    className="sidebar-user"
                    ref={userMenuRef}
                >

                    {userMenuOpen && (

                        <div
                            className={`user-menu ${
                                collapsed ? "compact" : ""
                            }`}
                        >

                            <button
                                type="button"
                                onClick={() => {
                                    setUserMenuOpen(false)

                                    // implementar quando a tela existir
                                }}
                            >
                                <LuUser />

                                <span>
                                    Perfil
                                </span>
                            </button>


                            <button
                                type="button"
                                onClick={() => {
                                    setUserMenuOpen(false)

                                    // implementar quando a tela existir
                                }}
                            >
                                <LuSettings />

                                <span>
                                    Configurações
                                </span>
                            </button>


                            <div className="user-menu-separator" />


                            <button
                                type="button"
                                className="logout-option"
                                onClick={handleLogout}
                            >
                                <LuLogOut />

                                <span>
                                    Sair
                                </span>
                            </button>

                        </div>

                    )}


                    {currentUser && (

                        <button
                            type="button"
                            className="user-summary"
                            onClick={() =>
                                setUserMenuOpen(prev => !prev)
                            }
                            aria-expanded={userMenuOpen}
                        >

                            <div className="user-avatar">
                                {getInitials(currentUser.name)}
                            </div>


                            <div className="user-information">

                                <span className="user-name">
                                    {currentUser.name}
                                </span>

                                <span className="user-role">
                                    {
                                        roleLabels[currentUser.role]
                                        ?? currentUser.role
                                    }
                                </span>

                            </div>


                            <span
                                className={
                                    `user-menu-arrow ${
                                        userMenuOpen ? "open" : ""
                                    }`
                                }
                            >
                                <LuChevronDown />
                            </span>

                        </button>

                    )}

                </div>

            </aside>


            <main className="main-content">
                <Outlet />
            </main>

        </div>
    )
}

export default MainLayout