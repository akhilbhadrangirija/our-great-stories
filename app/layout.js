import { Geist, Geist_Mono, Playfair_Display, Lato, Cinzel, Inter, Cormorant_Garamond, Montserrat, Oswald, Roboto, Abril_Fatface, Courier_Prime, Hurricane } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/lib/providers/MotionProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { Preloader } from "@/components/motion/Preloader";
import { PageTransition } from "@/components/motion/PageTransition";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Wedding Theme Fonts
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"] });
const lato = Lato({ variable: "--font-lato", weight: ["400", "700"], subsets: ["latin"] });
const cinzel = Cinzel({ variable: "--font-cinzel", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", weight: ["400", "600"], subsets: ["latin"] });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"] });
const oswald = Oswald({ variable: "--font-oswald", subsets: ["latin"] });
const roboto = Roboto({ variable: "--font-roboto", weight: ["400", "700"], subsets: ["latin"] });
const abril = Abril_Fatface({ variable: "--font-abril", weight: ["400"], subsets: ["latin"] });
const courier = Courier_Prime({ variable: "--font-courier", weight: ["400", "700"], subsets: ["latin"] });
const hurricane = Hurricane({ variable: "--font-hurricane", weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "OurGreatStory - Interactive Date Invites & Digital Gifts",
  description: "Stop sending boring texts. Start sending stories. Create playful, interactive digital date invites and virtual gifts for your partner.",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${lato.variable} ${cinzel.variable} ${inter.variable} ${cormorant.variable} ${montserrat.variable} ${oswald.variable} ${roboto.variable} ${abril.variable} ${courier.variable} ${hurricane.variable} antialiased`}
      >
        <Preloader />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <MotionProvider>
            <CustomCursor />
            <PageTransition>
              {children}
            </PageTransition>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
