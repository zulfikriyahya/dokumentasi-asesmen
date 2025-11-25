---
draft: true
sidebar:
  order: 3
title: "Instalasi Sistem Operasi"
description: "..."
---

# Instalasi Debian 13 untuk Server Asesmen CBT

## Pendahuluan

Panduan ini menjelaskan langkah-langkah instalasi Debian 13 "Trixie" sebagai sistem operasi untuk Server CBT. Instalasi akan dilakukan dalam mode **server** (tanpa GUI desktop) untuk performa optimal.

---

## Persiapan Instalasi

### Hardware Requirements (Minimum)

- ✅ CPU: Intel Core i5 gen 8+ atau AMD Ryzen 5 2600+
- ✅ RAM: 16 GB DDR4
- ✅ Storage: 256 GB SSD (sistem) + 500 GB HDD (data)
- ✅ Network: 1 Gigabit Ethernet
- ✅ Keyboard dan Monitor (untuk instalasi awal)

### Download ISO Debian 13

**Opsi 1: Debian 13 "Trixie" (Testing/Unstable)**

- Website: https://www.debian.org/devel/debian-installer/
- Pilih: **netinst CD image** (sekitar 400-600 MB)
- Arsitektur: **amd64** (64-bit) untuk Intel/AMD processor

**Opsi 2: Debian 12 "Bookworm" (Stable - Rekomendasi untuk Production)**

- Website: https://www.debian.org/distrib/
- Pilih: **netinst CD image**
- Arsitektur: **amd64**

**Catatan:** Debian 13 masih dalam tahap testing. Untuk server production yang membutuhkan stabilitas tinggi, gunakan Debian 12 "Bookworm" yang sudah stable.

### Membuat Bootable USB

**Di Linux:**

```bash
# Cek nama device USB (misal: /dev/sdb)
lsblk

# Tulis ISO ke USB (HATI-HATI: akan menghapus data di USB)
sudo dd if=debian-13-amd64-netinst.iso of=/dev/sdb bs=4M status=progress
sudo sync
```

**Di Windows:**

- Download **Rufus**: https://rufus.ie/
- Pilih ISO Debian
- Pilih USB drive
- Mode: **DD Image**
- Klik **Start**

---

## Proses Instalasi

### Step 1: Boot dari USB

1. Colokkan USB bootable ke server
2. Nyalakan server dan masuk ke **BIOS/UEFI** (tekan F2, F12, Del, atau Esc)
3. Set boot priority: **USB drive** sebagai boot pertama
4. Save dan restart

### Step 2: Debian Installer Boot Menu

Setelah boot dari USB, akan muncul menu:

```
Debian GNU/Linux installer boot menu
- Install
- Graphical install
- Advanced options
- ...
```

**Pilih:** `Install` (text-based installer) atau `Graphical install` (GUI installer)

**Rekomendasi:** Gunakan **Install** (text-based) karena lebih cepat dan stabil.

### Step 3: Language, Location, Keyboard

1. **Select a language:**

   - Pilih: `English` (rekomendasi untuk server)
   - Atau: `Indonesian` (jika lebih nyaman)

2. **Select your location:**

   - Country: `Indonesia`
   - atau pilih `other` → `Asia` → `Indonesia`

3. **Configure the keyboard:**
   - Keymap: `American English` (standard)
   - atau `Indonesian` (jika keyboard Indonesia)

### Step 4: Configure Network

1. **Hostname:**

   ```
   Hostname: cbt-server
   ```

   (atau nama lain yang deskriptif)

2. **Domain name:**

   ```
   Domain name: (kosongkan atau isi dengan domain internal)
   Contoh: madrasah.local
   ```

3. **Network Configuration:**
   - Installer akan otomatis detect network interface (eth0 atau enp0s3, dll)
   - Jika ada DHCP, akan otomatis dapat IP
   - **Untuk saat ini, biarkan auto (DHCP)**
   - Nanti akan kita set static IP 192.168.1.100 setelah instalasi selesai

### Step 5: Set Up Users and Passwords

1. **Root password:**

   ```
   New password: [Buat password kuat untuk root]
   Re-enter password: [Ulangi password]
   ```

   **Penting:** Catat password ini dengan aman!

2. **Create a new user:**
   - Full name: `Administrator` (atau nama lengkap)
   - Username: `admin` (atau username pilihan Anda)
   - Password: [Buat password kuat]
   - Re-enter password: [Ulangi password]

**Best Practice:**

- Root password: Minimal 16 karakter dengan kombinasi huruf, angka, simbol
- User admin: Minimal 12 karakter dengan kombinasi huruf, angka, simbol
- Jangan gunakan password yang mudah ditebak (123456, password, admin, dll)

### Step 6: Configure the Clock

1. **Time zone:**
   - Pilih: `Asia/Jakarta` (WIB)
   - atau `Asia/Makassar` (WITA)
   - atau `Asia/Jayapura` (WIT)

### Step 7: Partition Disks

**Opsi 1: Guided - Use Entire Disk (Mudah, Rekomendasi untuk Pemula)**

1. Pilih: `Guided - use entire disk`
2. Select disk: Pilih SSD 256GB untuk sistem
3. Partitioning scheme: `All files in one partition` (rekomendasi untuk server)
4. Finish partitioning: `Yes`
5. Write changes to disk: `Yes`

**Opsi 2: Manual Partitioning (Advanced, untuk Performance)**

Jika punya 2 disk (SSD + HDD), bisa setup manual:

**Disk 1 (SSD 256GB) - Untuk Sistem:**

```
/boot      : 512 MB  (ext4)
/          : 50 GB   (ext4) - root filesystem
/swap      : 16 GB   (swap) - sesuaikan dengan RAM
/var       : sisa   (ext4) - untuk logs dan cache
```

**Disk 2 (HDD 500GB) - Untuk Database dan Backup:**

```
/var/lib/mysql  : 200 GB (ext4) - untuk database MariaDB
/var/www        : 100 GB (ext4) - untuk aplikasi web
/backup         : 200 GB (ext4) - untuk backup
```

**Catatan:** Partisi manual memerlukan pemahaman sistem file Linux. Jika ragu, gunakan Opsi 1.

### Step 8: Configure Package Manager

1. **Scan another CD/DVD:**

   - Pilih: `No` (kita akan install dari network)

2. **Use a network mirror:**

   - Pilih: `Yes`

3. **Debian archive mirror country:**

   - Pilih: `Indonesia`

4. **Debian archive mirror:**

   - Pilih salah satu mirror Indonesia:
     - `kartolo.sby.datautama.net.id` (Surabaya)
     - `kebo.pens.ac.id` (Surabaya)
     - `mirror.cloudweaver.id` (Jakarta)
     - atau mirror terdekat

5. **HTTP proxy:**
   - Kosongkan (kecuali jika menggunakan proxy)

### Step 9: Software Selection

**Tunggu proses download dan instalasi base system**

Setelah selesai, akan muncul **Software selection screen:**

```
[*] Debian desktop environment
    [ ] ... GNOME
    [ ] ... Xfce
    [ ] ... KDE Plasma
    [ ] ... Cinnamon
    [ ] ... MATE
    [ ] ... LXDE
    [ ] ... LXQt
[*] web server
[*] SSH server
[*] standard system utilities
```

**Untuk Server CBT, pilih:**

- ☐ **UNCHECK** `Debian desktop environment` (kita tidak perlu GUI)
- ☑ `web server` (untuk Apache2)
- ☑ `SSH server` (untuk remote management)
- ☑ `standard system utilities` (tools dasar)

**Tekan TAB untuk navigasi, SPACE untuk select/unselect, ENTER untuk continue**

### Step 10: Install GRUB Boot Loader

1. **Install the GRUB boot loader:**

   - Pilih: `Yes`

2. **Device for boot loader installation:**
   - Pilih disk utama (biasanya `/dev/sda` atau `/dev/nvme0n1`)
   - **Jangan pilih partisi** (misal /dev/sda1), pilih **whole disk**

### Step 11: Finish Installation

1. **Installation complete:**
   - Pilih: `Continue`
2. **Server akan restart otomatis**
3. **Cabut USB bootable**
4. **Server akan boot ke Debian yang sudah terinstall**

---

## Post-Installation Setup

### Step 1: Login Pertama Kali

Setelah reboot, akan muncul login prompt:

```
Debian GNU/Linux 13 cbt-server tty1

cbt-server login: _
```

**Login sebagai user biasa:**

```
login: admin
Password: [password user admin]
```

### Step 2: Update System

```bash
# Ganti ke root user
su -
# atau
sudo su -

# Update package list
apt update

# Upgrade semua package
apt upgrade -y

# Install tools yang berguna
apt install -y vim nano htop curl wget net-tools

# Reboot jika ada kernel update
reboot
```

### Step 3: Install Sudo (Jika Belum Ada)

```bash
# Login sebagai root
su -

# Install sudo
apt install -y sudo

# Tambahkan user admin ke grup sudo
usermod -aG sudo admin

# Logout dan login kembali sebagai admin
exit
```

Setelah login kembali, test sudo:

```bash
sudo whoami
# Output harus: root
```

### Step 4: Konfigurasi Network Static IP

**Cek nama interface:**

```bash
ip addr show
# atau
ip a
```

Output contoh:

```
1: lo: <LOOPBACK,UP,LOWER_UP>
    inet 127.0.0.1/8
2: enp0s3: <BROADCAST,MULTICAST,UP,LOWER_UP>
    inet 192.168.1.50/24
```

Interface name: `enp0s3` (bisa berbeda: eth0, ens33, dll)

**Edit konfigurasi network:**

```bash
sudo nano /etc/network/interfaces
```

**Ubah dari DHCP ke Static:**

**Sebelum (DHCP):**

```
# The primary network interface
allow-hotplug enp0s3
iface enp0s3 inet dhcp
```

**Sesudah (Static IP 192.168.1.100):**

```
# The primary network interface
auto enp0s3
iface enp0s3 inet static
    address 192.168.1.100
    netmask 255.255.255.0
    gateway 192.168.1.1
    dns-nameservers 8.8.8.8 8.8.4.4
```

**Simpan:** CTRL+O, ENTER, CTRL+X

**Restart networking:**

```bash
sudo systemctl restart networking
# atau
sudo ifdown enp0s3 && sudo ifup enp0s3
```

**Verifikasi:**

```bash
ip addr show enp0s3
ping 192.168.1.1
ping 8.8.8.8
```

### Step 5: Konfigurasi Hostname dan /etc/hosts

**Edit hostname:**

```bash
sudo nano /etc/hostname
```

Isi:

```
cbt-server
```

**Edit /etc/hosts:**

```bash
sudo nano /etc/hosts
```

Tambahkan:

```
127.0.0.1       localhost
192.168.1.100   cbt-server.madrasah.local   cbt-server
```

**Apply changes:**

```bash
sudo hostnamectl set-hostname cbt-server
sudo systemctl restart systemd-hostnamed
```

**Verifikasi:**

```bash
hostname
hostname -f
```

### Step 6: Disable Root SSH Login (Security)

```bash
sudo nano /etc/ssh/sshd_config
```

Cari dan ubah:

```
PermitRootLogin no
```

Restart SSH:

```bash
sudo systemctl restart sshd
```

### Step 7: Setup Firewall (UFW)

```bash
# Install UFW
sudo apt install -y ufw

# Default policies
sudo ufw default deny incoming
sudo ufw default allow outgoing

# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP dan HTTPS (untuk CBT)
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status verbose
```

### Step 8: Setup Time Synchronization

```bash
# Install systemd-timesyncd (biasanya sudah ada)
sudo apt install -y systemd-timesyncd

# Enable dan start service
sudo systemctl enable systemd-timesyncd
sudo systemctl start systemd-timesyncd

# Check status
timedatectl status
```

Output harus menunjukkan:

```
System clock synchronized: yes
NTP service: active
```

### Step 9: Install Fail2ban (Security)

```bash
# Install fail2ban
sudo apt install -y fail2ban

# Enable dan start service
sudo systemctl enable fail2ban
sudo systemctl start fail2ban

# Check status
sudo fail2ban-client status
```

---

## Verifikasi Instalasi

### Checklist Post-Installation

- [ ] System dapat boot dengan normal
- [ ] Network dengan IP static 192.168.1.100 berfungsi
- [ ] Dapat ping ke gateway (192.168.1.1)
- [ ] Dapat ping ke internet (8.8.8.8 atau google.com)
- [ ] SSH server berjalan (test dari laptop lain: `ssh admin@192.168.1.100`)
- [ ] Firewall (UFW) aktif dan configured
- [ ] Time synchronization aktif
- [ ] Sudo berfungsi untuk user admin
- [ ] Root login via SSH disabled
- [ ] Hostname dan /etc/hosts configured

### Test Koneksi dari Client

**Dari laptop/komputer lain di network yang sama:**

```bash
# Test ping ke server
ping 192.168.1.100

# Test SSH ke server
ssh admin@192.168.1.100
```

Jika berhasil, Anda bisa login dan manage server via SSH tanpa harus ke server fisik.

---

## Commands Cheat Sheet

### System Information

```bash
# Check Debian version
cat /etc/debian_version
lsb_release -a

# Check kernel version
uname -r

# Check system uptime
uptime

# Check memory usage
free -h

# Check disk usage
df -h

# Check CPU info
lscpu
cat /proc/cpuinfo
```

### Network Commands

```bash
# Check IP address
ip addr show
ip a

# Check routing table
ip route show

# Check DNS configuration
cat /etc/resolv.conf

# Test connectivity
ping 192.168.1.1
ping google.com

# Check open ports
ss -tulnp
netstat -tulnp
```

### Service Management

```bash
# Check service status
sudo systemctl status service_name

# Start service
sudo systemctl start service_name

# Stop service
sudo systemctl stop service_name

# Restart service
sudo systemctl restart service_name

# Enable service at boot
sudo systemctl enable service_name

# Disable service at boot
sudo systemctl disable service_name
```

---

## Troubleshooting

### Problem: Network Tidak Berfungsi Setelah Set Static IP

**Solusi:**

```bash
# Cek konfigurasi /etc/network/interfaces
sudo cat /etc/network/interfaces

# Cek status interface
ip addr show

# Restart networking
sudo systemctl restart networking

# Atau manual down/up interface
sudo ifdown enp0s3
sudo ifup enp0s3

# Jika masih tidak bisa, reboot
sudo reboot
```

### Problem: Tidak Bisa SSH ke Server

**Solusi:**

```bash
# Cek SSH service status
sudo systemctl status sshd

# Check firewall
sudo ufw status

# Allow SSH jika belum
sudo ufw allow 22/tcp

# Restart SSH
sudo systemctl restart sshd

# Check dari server bisa SSH ke localhost
ssh localhost
```

### Problem: Lupa Password Root

**Solusi:**

1. Reboot server
2. Saat GRUB menu muncul, tekan `e` untuk edit
3. Cari baris yang dimulai dengan `linux`
4. Tambahkan `init=/bin/bash` di akhir baris
5. Tekan `Ctrl+X` untuk boot
6. Akan boot ke root shell
7. Remount filesystem:
   ```bash
   mount -o remount,rw /
   ```
8. Change password:
   ```bash
   passwd root
   ```
9. Sync dan reboot:
   ```bash
   sync
   reboot -f
   ```

### Problem: System Lambat/Hang

**Solusi:**

```bash
# Check running processes
top
htop

# Check memory
free -h

# Check disk I/O
iostat -x 1

# Check system logs
sudo journalctl -xe
sudo tail -f /var/log/syslog

# Reboot if necessary
sudo reboot
```

---

## Next Steps

Setelah instalasi Debian 13 selesai dan terverifikasi, langkah selanjutnya:

1. ✅ **Konfigurasi Sistem Operasi** (security hardening, optimization)
2. ⏭️ **Instalasi Database Server** (MariaDB)
3. ⏭️ **Instalasi Web Server** (Apache2 + PHP)
4. ⏭️ **Instalasi Aplikasi CBT** (Garuda CBT atau sejenis)
5. ⏭️ **Testing dan Konfigurasi Final**
