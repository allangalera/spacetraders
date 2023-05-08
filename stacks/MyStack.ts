import { SvelteKitSite, StackContext } from "sst/constructs";

export function API({ stack }: StackContext) {
  const website = new SvelteKitSite(stack, "Site", {
    path: "website/",
    customDomain: "spacetraders.allangalera.com",
  });
  stack.addOutputs({
    websiteUrl: website.url,
  });
}
