import { SvelteKitSite, StackContext, Config } from "sst/constructs";

export function API({ stack }: StackContext) {
  const DATABASE_HOST = new Config.Secret(stack, "DATABASE_HOST");
  const DATABASE_USERNAME = new Config.Secret(stack, "DATABASE_USERNAME");
  const DATABASE_PASSWORD = new Config.Secret(stack, "DATABASE_PASSWORD");
  const DISCORD_CLIENT_ID = new Config.Secret(stack, "DISCORD_CLIENT_ID");
  const DISCORD_CLIENT_SECRET = new Config.Secret(
    stack,
    "DISCORD_CLIENT_SECRET"
  );
  const DISCORD_REDIRECT_URI = new Config.Secret(stack, "DISCORD_REDIRECT_URI");
  // const VERSION = new Config.Parameter(stack, "VERSION", {
  //   value: "1.2.0",
  // });

  const website = new SvelteKitSite(stack, "Site", {
    path: "packages/website/",
    buildCommand: "pnpm build",
    bind: [
      DATABASE_HOST,
      DATABASE_USERNAME,
      DATABASE_PASSWORD,
      DISCORD_CLIENT_ID,
      DISCORD_CLIENT_SECRET,
      DISCORD_REDIRECT_URI,
    ],
    // customDomain: "spacetraders.allangalera.com",
  });

  stack.addOutputs({
    websiteUrl: website.url,
  });
}
