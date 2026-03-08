document.addEventListener("DOMContentLoaded", async () => {

  const supabaseUrl = "https://ljwaezduqvuxhyhcyruy.supabase.co";
  const supabaseKey = "sb_publishable_3I9rJGQ5Pg0NwOxCTRsy7g_p9psbzzF";

  const supabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
  );

  const loginForm = document.getElementById("loginForm");
  const messageDiv = document.getElementById("message");

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    messageDiv.style.display = "block";
    messageDiv.textContent = "Logging in...";
    messageDiv.className = "message";

    // 🔑 SUPABASE LOGIN
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      messageDiv.textContent = error.message;
      messageDiv.className = "message error";
      return;
    }






    const user = data.user;

    // 🔥 FETCH PROFILE FROM SUPABASE
    const { data: profileData, error: profileError } = await supabase
      .from("student_profiles")
      .select("*")
      .eq("email", user.email)
      .maybeSingle();

    if (profileError) {
      console.log(profileError);
      alert("Profile load failed");
      return;
    }

    if (!profileData) {
      alert("Profile not found. Please complete registration.");
      return;
    }

    // ✅ Save for dashboard
    localStorage.setItem("studentData", JSON.stringify(profileData));








    /* =========================
       🔥 IMPORTANT FIX 🔥
       studentData को overwrite मत करो
    ========================= */

    let studentData = JSON.parse(localStorage.getItem("studentData"));

    // अगर किसी कारण से data नहीं मिला
    if (!studentData) {
      studentData = { email };
      localStorage.setItem("studentData", JSON.stringify(studentData));
    }

    // login flag
    localStorage.setItem("isLoggedIn", "true");

    messageDiv.textContent = "Login successful!";
    messageDiv.className = "message success";

    // 👉 DASHBOARD PAGE
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 800);
  });

});
