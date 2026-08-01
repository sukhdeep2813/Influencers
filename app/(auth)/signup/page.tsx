import SignupForm from "./signup-form";

// Any server-side data you need
async function getSignupPageData() {
  // Example: feature flags, config, prefill, etc.
  return {
    defaultRole: "brand" as const,
    companyNameHint: "Acme Corp",
    creatorNameHint: "Alex Doe",
    // You could also fetch from DB, CMS, env, etc.
  };
}

export default async function SignupPage() {
  const data = await getSignupPageData();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <SignupForm
        defaultRole={data.defaultRole}
        companyNameHint={data.companyNameHint}
        creatorNameHint={data.creatorNameHint}
      />
    </div>
  );
}
