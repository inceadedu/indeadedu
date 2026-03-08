document.addEventListener("DOMContentLoaded", async () => {

  const supabaseUrl = "https://ljwaezduqvuxhyhcyruy.supabase.co";
  const supabaseKey = "sb_publishable_3I9rJGQ5Pg0NwOxCTRsy7g_p9psbzzF";

  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

  // logged user
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    alert("User not logged in");
    window.location.href = "login.html";
    return;
  }

  // profile load
  const { data, error } = await supabase
    .from("student_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.log(error);
    alert("Profile load failed");
    return;
  }

  // NAME
  document.getElementById("cardName").innerText =
    data.name.toUpperCase();

  // PHOTO
  if (data.image) {
    document.getElementById("cardPhoto").src = data.image;
  }

  // ROLL NO
  document.getElementById("cardRoll").innerText =
    data.roll_no || "N/A";

  // FIN NO
  document.getElementById("cardFin").innerText =
    data.fin_no || "N/A";

  // ISSUE DATE
  if (data.issue_date) {

    const date = new Date(data.issue_date);

    const formatted =
      (date.getMonth() + 1).toString().padStart(2, "0") +
      "/" +
      date.getFullYear();

    document.getElementById("cardIssueDate").innerText =
      formatted;
  }

if (data.valid_date) {

  const date = new Date(data.valid_date);

  const formatted =
    (date.getMonth()+1).toString().padStart(2,"0") +
    "/" +
    date.getFullYear();

  document.getElementById("cardValidDate").innerText =
    formatted;
}

  // =====================
  // DOWNLOAD LOGIC
  // =====================
  const btn = document.getElementById("downloadBtn");

  if (!btn) {
    console.error("Download button not found");
    return;
  }

  btn.addEventListener("click", async () => {
    try {
      const front = document.querySelector(".id-card.front");
      const back = document.querySelector(".id-card.back");

      if (!front || !back) {
        alert("ID card not found");
        return;
      }

      document.body.classList.add("download-mode");
      front.classList.add("download-card");
      back.classList.add("download-card");

      const frontCanvas = await html2canvas(front, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff"
      });

      const backCanvas = await html2canvas(back, {
        scale: 3,
        useCORS: true,
        backgroundColor: "#ffffff"
      });

      const jsPDF = window.jspdf.jsPDF;

      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = 210;
      const cardWidth = 160;
      const cardHeight = 100;
      const x = (pageWidth - cardWidth) / 2;

      pdf.addImage(frontCanvas.toDataURL("image/png"), "PNG", x, 30, cardWidth, cardHeight);
      pdf.addImage(backCanvas.toDataURL("image/png"), "PNG", x, 150, cardWidth, cardHeight);

      pdf.save("INSEAD_ID_Card_A4.pdf");

      front.classList.remove("download-card");
      back.classList.remove("download-card");
      document.body.classList.remove("download-mode");

    } catch (err) {
      console.error(err);
      alert("Download failed. Console check karo.");
    }
  });

});


