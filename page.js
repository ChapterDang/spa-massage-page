const pending = "Đang cập nhật";
const byId = (id) => document.getElementById(id);

function httpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url : null;
  } catch {
    return null;
  }
}

if (spa.name) {
  document.title = `${spa.name} | Spa massage tại TP. Hồ Chí Minh`;
  document.querySelectorAll("[data-spa-name]").forEach((name) => {
    name.textContent = spa.name;
  });
  document.querySelector("[data-name-pending]").hidden = true;
}

byId("gia-tri-dia-chi").textContent = spa.address || pending;
byId("gia-tri-gio-mo-cua").textContent = spa.hours || pending;
byId("gia-tri-dien-thoai").textContent = spa.phone || pending;
if (spa.phone && /^\+?\d+$/.test(spa.phone.replace(/[\s().-]/g, ""))) {
  const phoneLink = document.createElement("a");
  phoneLink.href = `tel:${spa.phone.replace(/[\s().-]/g, "")}`;
  phoneLink.textContent = spa.phone;
  byId("gia-tri-dien-thoai").replaceChildren(phoneLink);
}

const directionsUrl = httpsUrl(spa.directionsUrl);
if (directionsUrl && spa.address) {
  const directions = byId("chi-duong");
  directions.href = directionsUrl.href;
  directions.hidden = false;
}

const table = byId("bang-gia");
const menuNote = byId("ghi-chu-dich-vu");
table.hidden = spa.services.length === 0;
byId("chua-co-dich-vu").hidden = !table.hidden;
if (!table.hidden && spa.servicesAreSamples) {
  menuNote.hidden = false;
  table.setAttribute("aria-describedby", menuNote.id);
}

for (const service of spa.services) {
  const row = byId("danh-sach-dich-vu").insertRow();
  const name = document.createElement("th");
  name.scope = "row";
  name.className = "title-3";
  name.textContent = service.name;
  row.append(name);

  for (const value of [service.duration, service.price]) {
    const cell = row.insertCell();
    cell.className = value ? "body-3" : "body-6 muted";
    cell.textContent = value || pending;
  }
}

function photoFigure(photo, hero) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = photo.src;
  img.alt = photo.alt;
  img.loading = hero ? "eager" : "lazy";
  img.fetchPriority = hero ? "high" : "auto";
  figure.append(img);

  if (photo.caption || photo.sample) {
    const caption = document.createElement("figcaption");
    if (photo.caption) {
      const label = document.createElement("span");
      label.className = "caption-1";
      label.textContent = photo.caption;
      caption.append(label);
    }
    if (photo.sample) {
      const tag = document.createElement("span");
      tag.className = "sample-tag caption-3";
      tag.textContent = "Nội dung mẫu";
      caption.append(tag);
    }
    figure.append(caption);
  }
  return figure;
}

byId("anh-gioi-thieu").append(photoFigure(spa.heroPhoto, true));
byId("khong-gian").hidden = spa.gallery.length === 0;
byId("ghi-chu-hinh-anh").hidden = !spa.gallery.some((photo) => photo.sample);
byId("thu-vien-anh").append(...spa.gallery.map((photo) => photoFigure(photo, false)));

const zaloUrl = httpsUrl(spa.zaloUrl);
const hasZaloLink = zaloUrl && /(^|\.)zalo\.me$/i.test(zaloUrl.hostname);
document.querySelectorAll("[data-booking]").forEach((booking) => {
  const button = booking.querySelector("button");
  const status = booking.querySelector('[role="status"]');

  if (hasZaloLink) {
    const link = document.createElement("a");
    link.href = zaloUrl.href;
    link.className = button.className;
    link.append(...button.childNodes);
    button.replaceWith(link);
    status.remove();
    return;
  }

  button.addEventListener("click", () => {
    const isOpen = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!isOpen));
    status.textContent = isOpen ? "" : "Liên kết đặt lịch qua Zalo đang được cập nhật.";
  });
});
