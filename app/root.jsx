import {
  Links,
  Link,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from "remix";
import globalStylesUrl from '~/styles/global.css'

export const links = ()=>[{rel:'stylesheet',href:globalStylesUrl}]

export function meta() {
  return { title: "Remix Blog" };
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Links />
        <Meta />
      </head>
      <body>
        <Layout>
                <Outlet />
        </Layout>

        {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}

function Layout({children}){
    return (
        <>
            <nav className='navbar'>
                <Link to="/" className='logo'>
                    Remix
                </Link>
                <ul className="nav">
                    <li>
                        <Link to="/posts" className='logo'>Posts</Link>
                    </li>
                </ul>
            </nav>
            <div className="container">
                {children}
            </div>
        </>
    )
}
