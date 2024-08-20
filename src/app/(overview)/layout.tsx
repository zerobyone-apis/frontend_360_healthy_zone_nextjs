import { Navbar } from "@/app/ui/landing/navbar";
import { Footer } from "../ui/landing/footer";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar></Navbar>
			{children}
			<Footer></Footer>
		</>
	);
}
