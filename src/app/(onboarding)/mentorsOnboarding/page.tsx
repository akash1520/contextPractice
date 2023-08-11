"use client"
import React, { useEffect } from 'react';

// Optional: If you're using Next.js, import the Head component
// import Head from 'next/head';

function MentorsOnboarding() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//embed.typeform.com/next/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {/* Optional: Uncomment if you're using Next.js
      <Head>
        <title>Onboarding for Mentors</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`
          *{margin:0;padding:0;}
          html,body,iframe{border-radius:0 !important;}
        `}</style>
      </Head>
      */}
      <div
        data-tf-widget="J1V6FxEf"
        data-tf-opacity="100"
        data-tf-inline-on-mobile
        data-tf-iframe-props="title=Onboarding for Mentors"
        data-tf-transitive-search-params
        data-tf-auto-focus
        data-tf-medium="snippet"
        data-tf-full-screen
      />
    </>
  );
}

export default MentorsOnboarding;
