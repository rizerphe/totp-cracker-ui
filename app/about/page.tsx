import { Badge } from "@/components/ui/badge";
import Script from "next/script";
import { FaGithub } from "react-icons/fa";
import { Tweet } from "react-tweet";

export default function About() {
    return (
        <div className="max-w-2xl mx-auto my-8">
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                What is this?
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                One day I was randomly scrolling on twitter when I saw this:
            </p>
            <div className="flex justify-center" data-theme="dark">
                <Tweet id="1810426439792984165" />
            </div>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                Pretty cool, huh? What if I did that? The concept itself is
                pretty easy. A single token is a result of hashing a specific
                secret value, shared between your device and whoever issued the
                token, together with the unix time rounded to the nearest 30
                seconds. Just a simple SHA1 hash. And finding secrets that
                result in specific tokens at a specific time is really easy -
                you can just bruteforce them.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                Making a proof of concept did not at all require getting into
                how the protocol works etc. Within two hours I put together a
                rust script that generated random secrets and compared the
                tokens with the desired value. After I quickly made it
                multi-threaded, it needed mere seconds to find a match.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                But hey, wouldn't it be cool if it was a website? And wouldn't
                it be cool if it was all rust still? It's not even that I see a
                clear advantage to using rust here, I just think it's cool. The
                tricky part was multi-threading. Javascript by itself doesn't
                support it at all. Neither does webassembly. There is one
                solution: webworkers. That is, javascript instances running in
                the background. After setting a few headers to enable browser
                security features, it is even possible to create a shared memory
                buffer, letting a few workers use this buffer as their shared
                memory. Hey, we got multithreading now!
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                To be fair, I was very lazy about it all. Used{" "}
                <a href="https://github.com/RReverser/wasm-bindgen-rayon">
                    <Badge
                        variant="outline"
                        className="inline-flex gap-2 items-center max-w-fit"
                    >
                        <FaGithub /> wasm-bindgen-rayon
                    </Badge>
                </a>{" "}
                to handle all the threading setup for me. And I don't even do
                any advanced inter-thread communication. I just let every thread
                bruteforce 5k solutions, and if it doesn't work out, try again
                in a bit (letting the rest of the javascript event loop run in
                between these attempts cause a frozen browser isn't too
                appealing).
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                This is just a cool proof of concept. I didn't handle the cases
                where a browser might not support a feature at all. I wasn't at
                all careful about how I initialize the wasm runtime etc; it
                probably will break in a lot of environments. If the tool
                doesn't work for you, this is probably why.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                Another challenge was importing the TOTP secrets. Scanning codes
                one by one gets annoying quickly. Luckily, google has developed
                a protocol for migrating them. As far as I know, it's a fully
                internal, undocumented standard. And, in my personal opinion, a
                fairly stupid standard. However, people have reverse engineered
                it. I was uh umm <i>heavily inspired (wink wink)</i> by{" "}
                <a href="https://github.com/qistoph/otp_export">
                    <Badge
                        variant="outline"
                        className="inline-flex gap-2 items-center max-w-fit"
                    >
                        <FaGithub /> a python implementation of it
                    </Badge>
                </a>{" "}
                :3
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                All of this is available on github; both{" "}
                <a href="https://github.com/rizerphe/totp-cracker-wasm">
                    <Badge
                        variant="outline"
                        className="inline-flex gap-2 items-center max-w-fit"
                    >
                        <FaGithub />
                        the rust backend
                    </Badge>
                </a>{" "}
                and{" "}
                <a href="https://github.com/rizerphe/totp-cracker-ui">
                    <Badge
                        variant="outline"
                        className="inline-flex gap-2 items-center max-w-fit"
                    >
                        <FaGithub />
                        the webui
                    </Badge>
                </a>
                .
            </p>
        </div>
    );
}
