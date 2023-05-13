async function create(formData: FormData) {
  "use server";

  const email = formData.get("email");
  const password = formData.get("password");

  console.log({ email, password });
}

export default function SignUpPage() {
  return (
    <main className="h-screen flex flex-row gap-6 items-center justify-center">
      <form action={create} className="flex flex-col gap-4 w-full max-w-xs">
        <div className="flex flex-col gap-1">
          <label
            className="text-sm text-zinc-600 flex items-center justify-between"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            className="flex-1 rounded border border-zinc-300 shadow-sm px-3 py-2 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
            type="email"
            name="email"
            id="email"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            className="text-sm text-zinc-600 flex items-center justify-between"
            htmlFor="password"
          >
            Senha
          </label>
          <input
            className="flex-1 rounded border border-zinc-300 shadow-sm px-3 py-2 text-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
            type="password"
            name="password"
            id="password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-violet-500 text-white rounded px-3 h-10 font-semibold text-sm hover:bg-violet-600"
        >
          Register
        </button>
      </form>
    </main>
  );
}
