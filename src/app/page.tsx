import Image from "next/image";

export default function Home() {



  return (
    <div>

      <input type="email" id="email" placeholder="Email" />

      <input type="password" id="password" placeholder="Password" />

      <input type="password" id="confirmPassowrd" placeholder="Confirm Passowrd" />

      <button type="button" id="btnSubmit"> Submit </button>
    </div>
  );
}
