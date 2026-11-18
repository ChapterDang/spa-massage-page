// Cập nhật thông tin spa ở đây. Để trống những mục chưa xác nhận.
const spa = {
  name: "",
  address: "",
  hours: "",
  phone: "",
  zaloUrl: "", // Dán liên kết HTTPS của tài khoản Zalo đã xác nhận.
  directionsUrl: "", // Dán liên kết chỉ đường đến đúng địa chỉ.

  servicesAreSamples: true,
  services: [
    { name: "Massage toàn thân", duration: "", price: "" },
    { name: "Massage chân", duration: "", price: "" },
    { name: "Massage cổ vai gáy", duration: "", price: "" },
  ],

  // Khi thay bằng ảnh thật, cập nhật src, alt và đặt sample thành false.
  heroPhoto: {
    src: "assets/phong-massage.jpg",
    alt: "Phòng massage với giường phủ khăn màu kem và ánh nắng qua cửa gỗ",
    sample: true,
  },
  gallery: [
    {
      src: "assets/goc-cho.jpg",
      alt: "Ghế mây bên chậu cây và vách gỗ đón nắng",
      caption: "Góc chờ",
      sample: true,
    },
    {
      src: "assets/khan-va-dau.jpg",
      alt: "Khăn bông màu kem và chai dầu trên khay gỗ",
      caption: "Khăn và dầu massage",
      sample: true,
    },
  ],
};
