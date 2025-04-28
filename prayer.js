document.getElementById("lists").addEventListener("click", function () {
    const many = document.getElementById("many");
    many.style.display = many.style.display === "none" ? "flex" : "none";
});

const cities = {
    "القاهرة": "Cairo",
    "أسوان": "Aswan",
    "الإسكندرية": "Alexandria",
    "أسيوط": "Assiut",
    "بنها": "Benha",
    "الدقهلية": "Dakahlia",
    "البحيرة": "Beheira",
    "الغربية": "Gharbia",
    "الإسماعيلية": "Ismailia",
    "الجيزة": "Giza",
    "المنُوفيّة": "Menoufia",
    "المنيا": "Minya",
    "القليوبية": "Qalyubia",
    "الوادي الجديد": "New Valley",
    "السويس": "Suez",
    "بني سويف": "Beni Suef",
    "بورسعيد": "Port Said",
    "دمياط": "Damietta",
    "جنوب سيناء": "South Sinai",
    "كفر الشيخ": "Kafr El Sheikh",
    "مطروح": "Matrouh",
    "قنا": "Qena",
    "شمال سيناء": "North Sinai",
    "سوهاج": "Sohag"
};

function date() {
    const classes = document.getElementsByClassName("p");
    for (let i = 0; i < classes.length; i++) {
        classes[i].addEventListener("click", function (el) {
            const cityArabic = el.target.innerHTML;
            document.getElementById("place").innerHTML = cityArabic;
            const cityEnglish = cities[cityArabic];
            if (cityEnglish) {
                city(cityEnglish);
            } else {
                console.error("المدينة غير موجودة في القائمة.");
            }
            document.getElementById("many").style.display = "none";
        });
    }

    function city(city) {
        const loader = document.getElementById("loader");
        loader.style.display = "block"; // إظهار اللودنج
        axios.get('https://api.aladhan.com/v1/timingsByCity', {
            params: {
                country: "EG",
                city: city
            }
        })
        .then(function (response) {
            const date = response.data.data.timings;
            const day = response.data.data.date.hijri.weekday.ar;
            const year = response.data.data.date.gregorian.date;
            years("year", year);
            days("day", day);
            time("Fajr", date.Fajr);
            time("Sunrise", date.Sunrise);
            time("Dhuhr", date.Dhuhr);
            time("Asr", date.Asr);
            time("Maghrib", date.Maghrib);
            time("Isha", date.Isha);

            // إضافة أنيميشن عند تحديث المواقيت
            const boxes = document.querySelectorAll(".box");
            boxes.forEach((box, index) => {
                box.style.animation = "none";
                setTimeout(() => {
                    box.style.animation = `popIn 0.5s ease forwards`;
                    box.style.animationDelay = `${index * 0.1}s`;
                }, 10);
            });

            loader.style.display = "none"; // إخفاء اللودنج
        })
        .catch(function (error) {
            console.log(error);
            loader.style.display = "none"; // إخفاء اللودنج في حالة الخطأ
        });
    }
    city("Cairo");
}

function time(id, time) {
    document.getElementById(id).innerHTML = time;
}

function days(id, day) {
    document.getElementById(id).innerHTML = day;
}

function years(id, year) {
    document.getElementById(id).innerHTML = year;
}

date();