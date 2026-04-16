document.addEventListener("DOMContentLoaded", async () => {
  console.log("DOM ready");


  const supabaseUrl = "https://ljwaezduqvuxhyhcyruy.supabase.co";
  const supabaseKey = "sb_publishable_3I9rJGQ5Pg0NwOxCTRsy7g_p9psbzzF";

  const supabase = window.supabase.createClient(
    supabaseUrl,
    supabaseKey
  );


  // Course data with duration and subjects
  const programCourses = {
    full_time_masters: [
      { value: "mim", label: "Master in Management" },
      { value: "mif", label: "Master in Finance" },
      { value: "mba", label: "MBA" }
    ],

    diploma_courses: [   // ✅ NEW CATEGORY
      { value: "dhm", label: "Diploma in Hospitality Management" }
    ],

    executive_masters: [
      { value: "gemba", label: "Global Executive MBA" },
      { value: "gemba_flex", label: "Global Executive MBA Flex" },
      { value: "emfin", label: "Executive Master in Finance" },
      { value: "emchange", label: "Executive Master in Change" },
      { value: "tsinghua_gemba", label: "Tsinghua-INSEAD Executive MBA" }
    ]
  };



  const programmeDetails = {
    mim: {
      duration: "14–16 Months",
      subjects: [
        "Strategy",
        "Marketing",
        "Financial Accounting",
        "Leadership",
        "Business Ethics"
      ]
    },
    mif: {
      duration: "12 Months",
      subjects: [
        "Corporate Finance",
        "Investment Banking",
        "Financial Markets",
        "Risk Management"
      ]
    },

    dhm: {
      duration: "1 Year",
      subjects: [
        "Food Production",
        "Food & Beverage Service",
        "Front Office Management",
        "Housekeeping",
        "Communication Skills",
        "Hospitality Management Basics"
      ]
    },

    mba: {
      duration: "10 Months",
      subjects: [
        "Strategy",
        "Entrepreneurship",
        "Operations",
        "Leadership",
        "Economics"
      ]
    },
    gemba: {
      duration: "14–17 Months",
      subjects: [
        "Global Strategy",
        "Leadership",
        "Digital Transformation"
      ]
    },
    gemba_flex: {
      duration: "20 Months",
      subjects: [
        "Executive Leadership",
        "Finance for Executives",
        "Global Markets"
      ]
    },
    emfin: {
      duration: "18 Months",
      subjects: [
        "Advanced Finance",
        "Capital Markets",
        "Corporate Valuation"
      ]
    },
    emchange: {
      duration: "18 Months",
      subjects: [
        "Change Management",
        "Organisational Behaviour",
        "Leadership"
      ]
    },
    tsinghua_gemba: {
      duration: "22 Months",
      subjects: [
        "China Business",
        "Global Strategy",
        "Executive Leadership"
      ]
    }





  };



  // Get DOM elements
  const photoInput = document.getElementById('photoInput');
  const photoPreview = document.getElementById('photoPreview');
  // const uploadBtn = document.getElementById('uploadBtn');
  const courseSelect = document.getElementById('course');
  const courseDuration = document.getElementById('courseDuration');
  const registrationForm = document.getElementById('registrationForm');
  const subjectsContainer = document.getElementById("subjectsContainer");


  photoPreview.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    photoInput.click();
  });

  photoInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        photoPreview.innerHTML = `<img src="${event.target.result}" alt="Student Photo">`;
        photoPreview.style.borderStyle = 'solid';
        photoPreview.style.borderColor = '#667eea';
      };
      reader.readAsDataURL(file);
    } else if (file) {
      alert('Please select a valid image file!');
      photoInput.value = '';
    }
  });



  const programTypeSelect = document.getElementById("programType");


  programTypeSelect.addEventListener("change", () => {
    const selectedProgram = programTypeSelect.value;

    courseSelect.innerHTML = "";
    courseSelect.disabled = true;

    if (!selectedProgram || !programCourses[selectedProgram]) {
      courseSelect.innerHTML =
        `<option value="">Select Program Type First</option>`;
      return;
    }

    courseSelect.disabled = false;
    courseSelect.innerHTML =
      `<option value="">Select Programme</option>`;

    programCourses[selectedProgram].forEach(course => {
      const option = document.createElement("option");
      option.value = course.value;
      option.textContent = course.label;
      courseSelect.appendChild(option);
    });
  });

  courseSelect.addEventListener("change", () => {
    const selectedProgramme = courseSelect.value;

    subjectsContainer.innerHTML = "";
    courseDuration.value = "";

    if (!selectedProgramme || !programmeDetails[selectedProgramme]) {
      return;
    }

    // ✅ Duration autofill
    courseDuration.value = programmeDetails[selectedProgramme].duration;

    // ✅ Subjects as checkboxes
    programmeDetails[selectedProgramme].subjects.forEach(subject => {
      const label = document.createElement("label");
      label.style.display = "block";
      label.style.cursor = "pointer";
      label.style.marginBottom = "6px";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = subject;
      checkbox.required = true;
      checkbox.style.marginRight = "8px";

      label.appendChild(checkbox);
      label.append(subject);

      subjectsContainer.appendChild(label);
    });
  });

  // Form submission
  registrationForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // ✅ ALWAYS declare at top
    let photoSrc = null;

    // PHOTO CHECK
    if (!photoInput.files || photoInput.files.length === 0) {
      alert("Please upload your photo before registration");
      photoInput.click();
      return;
    }

    // PHOTO SRC
    const imgTag = photoPreview.querySelector("img");
    if (imgTag) {
      photoSrc = imgTag.src;
    }

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const applicationId = document.getElementById("applicationId").value;
    const commencementDate = document.getElementById("commencementDate").value;


    const rollNo = document.getElementById("rollNo").value;
    const finNo = document.getElementById("finNo").value;
    const issueDate = document.getElementById("issueDate").value;
    const validDate = document.getElementById("validDate").value;






    if (!email || !password) {
      alert("Email & password required");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    // 🔐 AUTH SIGNUP
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    });

    if (error) {
      console.log("SIGNUP ERROR 👉", error);
      alert(error.message);
      return;
    }

    // 🔥 FIX
    if (!data.user) {
      alert("Signup successful! Please login.");
      window.location.href = "login.html";
      return;
    }

    const userId = data.user.id;

    if (!userId) {
      alert("Signup failed. Please check email confirmation.");
      return;
    }

    // 📦 INSERT PROFILE
    const { error: profileError } = await supabase
      .from("student_profiles")
      .insert({
        id: userId,
        name: document.getElementById("studentName").value,
        email,
        dob: document.getElementById("dob").value || null,
        passport: document.getElementById("passportNo").value,
        application_id: applicationId,       // 👈 ADD THIS
        commencement: commencementDate,      // 👈 ADD THIS

        roll_no: rollNo,
        fin_no: finNo,
        issue_date: issueDate,
        valid_date: validDate,

        program: document.getElementById("programType").options[
          document.getElementById("programType").selectedIndex
        ].text,
        course: document.getElementById("course").options[
          document.getElementById("course").selectedIndex
        ].text,
        duration: document.getElementById("courseDuration").value,
        image: photoSrc   // ✅ NOW ALWAYS DEFINED
      });

    if (profileError) {
      console.log("ERROR 👉", profileError);
      alert(profileError.message);
      return;
    }

    // localStorage.setItem("studentData", JSON.stringify({
    //   name: document.getElementById("studentName").value,
    //   image: photoSrc,
    //   rollNo: rollNo,
    //   finNo: finNo,
    //   issueDate: issueDate
    // }));

    alert("Signup completed successfully");
    window.location.href = "login.html";
  });


});

window.addEventListener('load', () => {
  document.querySelector('.container').style.opacity = '0';
  setTimeout(() => {
    document.querySelector('.container').style.transition = 'opacity 0.5s ease-in';
    document.querySelector('.container').style.opacity = '1';
  }, 100);
});


