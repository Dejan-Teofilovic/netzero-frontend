import React, { useMemo, useState } from 'react'
import { Button, IconButton, Menu, MenuHandler, MenuItem, MenuList } from '@material-tailwind/react'
import { Icon } from '@iconify/react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useMobileMenu from '../../hooks/useMobileMenu';
import useUser from '../../hooks/useUser';

/* -------------------------------------------------------------------- */

interface INavLink {
  id: number;
  label: string;
  to: string;
}

/* -------------------------------------------------------------------- */

const NAV_LINKS_OF_EMITTER: Array<INavLink> = [
  {
    id: 1,
    label: 'Claim Token',
    to: '/claim-token'
  },
  {
    id: 2,
    label: 'My Claims',
    to: '/my-claims'
  }
]

const NAV_LINKS_OF_OFFSETTER: Array<INavLink> = [
  {
    id: 1,
    label: 'Offset Projects',
    to: '/offset-projects'
  }
]

/* -------------------------------------------------------------------- */

export default function Navbar() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { openMenu, closeMenu, opened } = useMobileMenu()
  const { token, logout, user } = useUser()

  const [isShadow, setIsShadow] = useState<boolean>(false)

  const icon = useMemo<string>(() => {
    if (opened) {
      return 'akar-icons:cross'
    } else {
      return 'material-symbols:menu-rounded'
    }
  }, [opened])

  const navbarBgClassName = useMemo(() => {
    if (pathname === '/') {
      return 'bg-gradient-to-t from-[#11909d] to-blue-900'
    } else {
      return 'bg-gradient-to-t from-[#11909d] to-blue-900'
    }
  }, [pathname])

  const toggleMobileMenu = () => {
    if (opened) {
      return closeMenu()
    } else {
      return openMenu()
    }
  }

  const toggleShadow = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 100) {
      setIsShadow(true)
    } else if (scrolled <= 100) {
      setIsShadow(false)
    }
  }

  window.addEventListener('scroll', toggleShadow);

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="sticky top-0 z-20">
      <div className={`relative ${isShadow ? 'shadow-2xl' : ''}`}>
        <div className={`relative px-6 py-4 z-20 ${navbarBgClassName}`}>
          <div className="container max-w-6xl mx-auto">
            <div className="flex justify-between items-center md:items-end">
              <Link to="/">
                <img src="vite.svg" alt="Logo" className="w-12" />
              </Link>

              {/* For Desktop */}
              <div className="hidden lg:flex gap-1">
                {token && (
                  user?.id_user_type === 1 ?
                    NAV_LINKS_OF_EMITTER.map(navLink => (
                      <Button key={navLink.id} variant="text" className="text-white text-base normal-case">
                        <Link to={navLink.to}>
                          {navLink.label}
                        </Link>
                      </Button>
                    )) : NAV_LINKS_OF_OFFSETTER.map(navLink => (
                      <Button key={navLink.id} variant="text" className="text-white text-base normal-case">
                        <Link to={navLink.to}>
                          {navLink.label}
                        </Link>
                      </Button>
                    ))
                )}
              </div>

              {/* For Mobile */}
              <IconButton
                variant="text"
                className="text-3xl flex lg:hidden text-white"
                onClick={toggleMobileMenu}
              >
                <Icon icon={icon} />
              </IconButton>

              {token ? (
                <Menu>
                  <MenuHandler>
                    <Button variant="text" className="hidden lg:flex items-center gap-1 px-0 text-base normal-case text-white">
                      <Icon icon="mdi:user" className="text-2xl" />
                      {user?.first_name} {user?.last_name}
                    </Button>
                  </MenuHandler>
                  <MenuList>
                    <MenuItem onClick={handleLogout}>
                      Log out
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Button
                  className="hidden lg:flex bg-secondary hover:bg-secondary text-black text-sm normal-case"
                >
                  <Link to="/login">
                    Log in
                  </Link>
                </Button>
              )}

            </div>
          </div>
        </div>

        {opened && (
          <div className={`absolute w-full flex lg:hidden flex-col items-center backdrop-blur-2xl px-4 py-4 ${isShadow && 'shadow-2xl'} ${navbarBgClassName}`}>
            {token && (user?.id_user_type === 1 ?
              NAV_LINKS_OF_EMITTER.map(navLink => (
                <Button key={navLink.id} variant="text" className="text-white text-sm normal-case">
                  <Link to={navLink.to}>
                    {navLink.label}
                  </Link>
                </Button>
              )) : NAV_LINKS_OF_OFFSETTER.map(navLink => (
                <Button key={navLink.id} variant="text" className="text-white text-sm normal-case">
                  <Link to={navLink.to}>
                    {navLink.label}
                  </Link>
                </Button>
              )))
            }

            <div className="h-0.5 bg-white bg-opacity-25 w-full my-4" />
            {token ? (
              <>
                <Button variant="text" className="text-white text-sm normal-case" onClick={handleLogout}>
                  Log out
                </Button>
              </>
            ) : (
              <Button
                className="bg-secondary hover:bg-secondary text-black text-sm normal-case"
              >
                <Link to="/login">
                  Login
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}