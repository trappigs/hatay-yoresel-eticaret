import { MedusaContainer } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";

/**
 * One-off admin (re)provisioning.
 *
 * Deletes any existing user + emailpass auth identity for ADMIN_EMAIL, then
 * recreates them with the password from the ADMIN_PASSWORD env var. Used once
 * to fix an admin whose password was set incorrectly; safe to re-run.
 *
 * Run:  npx medusa exec ./src/scripts/reset-admin.ts
 * Requires env: ADMIN_PASSWORD  (optional: ADMIN_EMAIL, defaults below)
 */
export default async function resetAdmin({ container }: { container: MedusaContainer }) {
  const email = process.env.ADMIN_EMAIL || "halilhasimoglu@gmail.com";
  const password = process.env.ADMIN_PASSWORD || "";

  if (!password) {
    console.log("RESET-ADMIN: ADMIN_PASSWORD not set — skipping.");
    process.exit(0);
  }

  const userService: any = container.resolve(Modules.USER);
  const authService: any = container.resolve(Modules.AUTH);

  try {
    // 1. delete existing users with this email
    const users = await userService.listUsers({ email });
    for (const u of users) {
      await userService.deleteUsers([u.id]);
      console.log("RESET-ADMIN: deleted user", u.id);
    }

    // 2. delete existing auth identities whose emailpass entity_id is this email
    const idents = await authService.listAuthIdentities(
      {},
      { relations: ["provider_identities"] }
    );
    for (const ai of idents) {
      const pis = ai.provider_identities || [];
      if (pis.some((p: any) => p.entity_id === email)) {
        await authService.deleteAuthIdentities([ai.id]);
        console.log("RESET-ADMIN: deleted auth identity", ai.id);
      }
    }

    // 3. register emailpass (hashes password), create user, link them
    const reg = await authService.register("emailpass", { body: { email, password } });
    const authIdentity = reg?.authIdentity;
    if (!authIdentity) {
      console.log("RESET-ADMIN: register failed:", JSON.stringify(reg));
      process.exit(0);
    }
    const user = await userService.createUsers({ email });
    await authService.updateAuthIdentities({
      id: authIdentity.id,
      app_metadata: { user_id: user.id },
    });

    console.log("RESET-ADMIN: OK — admin ready for", email);
  } catch (e: any) {
    console.log("RESET-ADMIN: ERROR", e?.message || e);
  }
  process.exit(0);
}
