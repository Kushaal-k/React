import { useState, useCallback, useRef, useEffect } from "react";

function App() {
    const [password, setPassword] = useState("");
    const [hasNumber, setHasNumber] = useState(false);
    const [hasCharacter, setHasCharacter] = useState(false);
    const [length, setLength] = useState(8);

    const passwordRef = useRef(null);

    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if (hasNumber) str += "1234567890";

        if (hasCharacter) str += "!@#$%^&*|.,?-=";

        for (let i = 1; i < length; i++) {
            let char = Math.floor(Math.random() * str.length + 1);

            pass += str.charAt(char);
        }

        setPassword(pass);
    }, [hasNumber, hasCharacter, length]);

    const copyPasswordToClipboard = useCallback(() => {
      passwordRef.current?.select();
      passwordRef.current?.setSelectionRange(0,3)
      window.navigator.clipboard.writeText(password);
    },[password])

    useEffect(() => {
        passwordGenerator();
    }, [length, hasCharacter, hasNumber, passwordGenerator]);

    return (
        <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-2 my-8 text-orange-500 bg-gray-700 text-center">
            <h1 className="text-2xl mb-2">Password Generator</h1>
            <div className="flex shadow rounded-lg overflow-hidden mb-4">
                <input
                    type="text"
                    value={password}
                    className="outline-none w-full py-1 px-3 bg-white"
                    placeholder="password"
                    readOnly
                    ref={passwordRef}
                />
                <button 
                className="putline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
                onClick={copyPasswordToClipboard}
                >
                    Copy
                </button>
            </div>

            <div className="flex text-sm gap-x-2">
                <div className="flex items-center gap-x-1">
                    <input
                        type="range"
                        min={6}
                        max={100}
                        value={length}
                        className="cursor-pointer"
                        onChange={(e) => {
                            setLength(e.target.value);
                        }}
                    />
                    <label>Length: {length}</label>
                </div>
                <div className="flex items-center gap-x-1">
                    <input
                        type="checkbox"
                        defaultChecked={hasNumber}
                        id="numberInput"
                        onChange={() => {
                            setHasNumber((prev) => !prev);
                        }}
                    />
                    <label htmlFor="numberInput">Numbers</label>

                    <div className="flex items-center gap-x-1">
                        <input
                            type="checkbox"
                            id="characterInput"
                            defaultChecked={hasCharacter}
                            onChange={() => {
                                setHasCharacter((prev) => !prev);
                            }}
                        />
                        <label htmlFor="characterInput">Characters</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
