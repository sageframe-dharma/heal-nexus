import type { EventContext } from "@cloudflare/workers-types";

interface Env {
  PASSWORD: string;
}

export async function onRequestPost(
  context: EventContext<Env, string, unknown>
): Promise<Response> {
  const { password } = await context.request.json<{ password: string }>();
  const correct = context.env.PASSWORD;

  if (!correct) {
    return Response.json({ ok: false, error: "Not configured" }, { status: 500 });
  }

  if (password === correct) {
    return Response.json({ ok: true });
  }

  return Response.json({ ok: false }, { status: 401 });
}
