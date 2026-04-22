import { Outlet } from "react-router"
import NavBar from "~/components/nav/nav-bar"

export default function PageLayout() {
	return (
		/* No padding here — NavBar is fixed, pages manage their own top offset */
		<div className="flex min-h-screen flex-col">
			<NavBar />
			<main className="flex flex-grow flex-col">
				<Outlet />
			</main>
		</div>
	)
}
