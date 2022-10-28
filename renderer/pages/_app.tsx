import { AppProps } from "next/app";
import { PlayerProvider } from "../contexts/PlayerContext";
import '../styles/globals.css';

export default function MyApp({ Component, pageProps}: AppProps){

    return (
			<>
				<PlayerProvider>
					<Component {...pageProps} />
				</PlayerProvider>
			</>
		);

}