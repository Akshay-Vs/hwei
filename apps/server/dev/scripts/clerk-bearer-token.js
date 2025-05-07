// Paste this into the browser console to get a Clerk Bearer Token.

(async () => {
  try {
    const token = await window.Clerk.session.getToken({ template: 'test_1' });
    console.log('👇 Token below — copy it manually:');
    console.log(token);

    // Create a temporary textarea to auto-select
    const el = document.createElement('textarea');
    el.value = token;
    document.body.appendChild(el);
    el.select();
    el.setSelectionRange(0, el.value.length); // For mobile support
    document.execCommand('copy');
    document.body.removeChild(el);

    console.log('✅ Token copied to clipboard (if browser allowed it).');
  } catch (err) {
    console.error('❌ Failed to copy token:', err);
  }
})();
