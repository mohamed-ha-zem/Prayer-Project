// لما اضغط علي القائمه بتاعت الاماكن 
document.getElementById("lists").addEventListener("click" , function(){
    // لو القائمه ده مخفيه هتظهرها لكن لو ظاهره هتخفيها
    if(document.getElementById("many").style.display === "none"){
        document.getElementById("many").style.display = "flex"
    }else{
        document.getElementById("many").style.display = "none"
    }
})
// بنجيب كل المدن
let tags = document.getElementsByClassName("p")
// (plase اللي واخد الكلاس)بنعمل لوب علي كل المدن ولما اضغط علي اي مدينه هنحط المحتوي بتاعها في محتوي المكان فوق
for(i=0; i<tags.length; i++){
        tags[i].onclick =  function(el){
        document.getElementById("place").innerHTML = el.target.innerHTML
    }
}
// عملت اوبجيكت فيه كل المدن  
const cities = {
    "القاهره": "Cairo",
    "اسوان": "Aswan",
    "الإسكندرية": "Alexandria",
    "اسيوط": "Asyut",
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
    "أسوان": "Aswan",
    "أسيوط": "Assiut",
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
// عملت فانكشن بتعمل لوب علي كل المدن والمدينه اللي اضغط عليها باخد بيانتها واحطها فوق في مكانها
function date(){
    let classes = document.getElementsByClassName("p")
    for(i=0; i<classes.length; i++){
        classes[i].addEventListener("click" , function(el){
            const cityArabic = el.target.innerHTML;
            const cityEnglish = cities[cityArabic]; // نحصل على الاسم الإنجليزي من الكائن
            if (cityEnglish) {
                city(cityEnglish);
            } else {
                console.error("المدينة غير موجودة في القائمة.");
            }
        })
    }
    // api ده بقه الفانكشن اللي بتجبلي البيانات عن المدينه ده من ال 
    function city(city){
        axios.get('https://api.aladhan.com/v1/timingsByCity/03-12-2024?country=EG&city=Cairo', { //  http://api.aladhan.com/v1/timingsByCity
            params: {
                country: "EG", 
                city: city
            }
        })
        .then(function (response) {
            let date = response.data.data.timings
            let day = response.data.data.date.hijri.weekday.ar
            let year = response.data.data.date.gregorian.date
            years("year" , year)
            days("day" , day)
            time("Fajr" , date.Fajr)
            time("Sunrise" , date.Sunrise)
            time("Dhuhr" , date.Dhuhr)
            time("Asr" , date.Asr)
            time("Maghrib" , date.Maghrib)
            time("Isha" , date.Isha)
        })
        .catch(function (error) {
            console.log(error);
        })
    }
    city("Cairo") // علشان تجيب بيانات القاهره بدل ما متجبش حاجه خالص
}
date()
//  api اللي انا كاتبه للصلاه اللي بضغط عليها وتحط التاريخ بتاعه من ال id فانكشن مهمتها انها بتاخد ال 
function time(id , time){
    document.getElementById(id).innerHTML = time
}
// لما اضغط علي المدينه api بتاع اليوم الللي فوق وتحط فيه اليوم اللي هاخده من ال  id فانكشن مهمتها انها بتاخد
function days(id , day){
    document.getElementById(id).innerHTML = day
}
// لما اضغط علي المدينه api بتاع السنه الللي فوق وتحط فيه السنه اللي هاخدها من ال  id فانكشن مهمتها انها بتاخد
function years(id , year){
    document.getElementById(id).innerHTML = year
}





















