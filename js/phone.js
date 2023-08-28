const loadPhone = async(searchText='13', isShowAll) => {    //6. parameter dite hobe 1 ta
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);   //7. dynamic search result pete = er por search text ta dite hobe.
    const data = await res.json();
    const phones = data.data;
    //console.log(phones);
    displyPhones(phones, isShowAll);

}

const displyPhones = (phones, isShowAll) => {
//console.log(phones);
//1. get container
const phoneContainer = document.getElementById('phone-container');

//8.clear phone container cards before adding new cards
phoneContainer.textContent = '';

const showAllContainer = document.getElementById('show-all-container')
// display show all button if there are more than 12 phone
if(phones.length > 12 && !isShowAll){
showAllContainer.classList.remove('hidden');
}else{
  showAllContainer.classList.add('hidden');
}

// console.log('is show all', isShowAll)
//display only first 12 phone if not show all
if (!isShowAll){
  phones = phones.slice(0,12)
}

phones.forEach(phone => {
    // console.log(phone);

    //2.create a div
    const phoneCard = document.createElement('div');
    phoneCard.classList =`card  bg-gray-100  p-4 shadow-xl`
    //3. set inner HTML
    phoneCard.innerHTML =`
    <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-center">
        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
      </div>
    </div>
    
    `;
    //4. append child
    phoneContainer.appendChild(phoneCard);
    
});
//hide loading spinner
toggleLoadingSpinner(false);
    
};
// 
const handleShowDetail = async(id) =>{
// console.log('show all ',id)
// load single phone data
const res = await fetch(` https://openapi.programming-hero.com/api/phone/${id}`)
const data = await res.json();
console.log(data);


const phone = data.data;
showPhoneDetails(phone)
}


const showPhoneDetails =(phone) => {
  console.log(phone)



  const showDetailContainer = document.getElementById('show-detail-container');
showDetailContainer.innerHTML =`
<img src ="${phone.image}" alt=" " />
<p><span>Storage: </span> ${phone?.mainFeatures?.storage}</P>
<p><span>Display Size: </span> ${phone?.mainFeatures?.displaySize}</P>
<p><span>Memory: </span> ${phone?.mainFeatures?.memory}</P>
<p><span>GPS: </span> ${phone.others?.GPS || 'No GPS available'}</P>




`

//show the modal
show_modal_details.showModal()
const phoneName = document.getElementById('show-details-phone-name');
phoneName.innerText = phone.name;
}







//5.handle search button
const handleSearch= (isShowAll) => {
  toggleLoadingSpinner(true);
const searchField = document.getElementById('search-field');
const searchText = searchField.value;
//console.log(searchText);
loadPhone(searchText,isShowAll);

}
//handle surch input recap
// const handleSearch2 = () =>{
//   toggleLoadingSpinner(true);
//   const searchField2 = document.getElementById('search-field2');
//   const searchText2 = searchField2.value;
//  loadPhone(searchText2);
// }

const toggleLoadingSpinner = (isLoading) =>{
  const loadingSpinner = document.getElementById('loadingSpinner');
 if(isLoading){
  loadingSpinner.classList.remove('hidden');
 }else{
  loadingSpinner.classList.add('hidden');
 }
}


const handleShowAll =() =>{
 handleSearch(true);
}










loadPhone();