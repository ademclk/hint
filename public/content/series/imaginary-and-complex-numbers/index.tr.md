---
title: 'Sanal ve Karmaşık Sayılar'
excerpt: 'Kuantum bilişimin temelindeki matematiksel kavramları inceliyoruz.'
author: 'Adem'
part: 2
language: 'tr'
---

# Sanal ve Karmaşık Sayılar

Önceki bölümde bilgisayarlardan bahsetmiştik. Bu bölümde kuantum bilişimi mümkün kılan matematiksel temelleri keşfedeceğiz.

## Sanal Sayılar Nedir?

Gerçek sayılarla bazı denklemleri çözemeyiz.

$$x^2 = -1$$

Bunu çözemiyoruz çünkü bir sayının karesi negatif olamaz. Matematikçiler bu sorunu çözmek için yeni bir sayı icat etmiş ve ona i adını vermişler:

$$i^2 = -1$$

i gerçek bir sayı olamayacağından dolayı **sanal sayı** olarak adlandırılmış. Tek farkı karesinin -1 olması onun dışında sayılar üzerinde yaptığımız işlemler i üzerinde de yapılabilir.

$$i + i = 2i$$

$$i - i = 0$$

$$(-1) \cdot i = -i$$

$$(-i)^2 = -1$$

i sayısı ve i'nin katları da sanal sayı olarak adlandırılır.

## Sanal Sayının Kuvvetleri

Sanal sayı i'nin kuvvetleri döngüseldir.

- $i^0 = 1$
- $i^1 = i$
- $i^2 = -1$
- $i^3 = -i$
- $i^4 = 1$

Bu döngüsel desen sonsuza kadar devam eder ve kuantum mekaniğinde döngüsel simetriler ve fazlarla uğraştığımızda kritik hale gelir.

## Karmaşık Sayılar Nedir?

Gerçek sayı ile sanal sayı birleşince **karmaşık sayı** oluşur:

$$a + bi$$

Burada a ve b gerçek sayılar, i ise yukarıda tanımladığımız sanal sayı.

$$3 + 4i, \quad -5 - 2i$$

Hatta bildiğimiz gerçek sayılar bile aslında karmaşık sayıların özel bir hali olarak gösterilebilir:

$$2 = 2 + 0i, \quad -3i = 0 - 3i$$

---

## Karmaşık Sayılarla İşlemler

### Toplama

Karmaşık sayıları toplamak için gerçek ve sanal kısımlar ayrı ayrı toplanır:

$$(1 + 2i) + (3 + 4i) = 4 + 6i$$

### Çarpma

Çarpmak için dağıtma işlemi yapılır ve $i^2 = -1$ kullanılır.

$$x \cdot y = (a + bi)(c + di)$$

$$= a \cdot c + a \cdot di + b \cdot i \cdot c + b \cdot i \cdot d \cdot i$$

$$= ac + adi + bci + bdi^2$$

$$bdi^2 = bd \cdot (-1) = -bd$$

Son olarak terimleri gruplandıralım

- **Gerçek kısım:** $ac - bd$
- **Sanal (imaginary) kısım:** $ad + bc$

$$(a + bi)(c + di) = (ac - bd) + (ad + bc)i$$

---

## Eşlenik ve Bölme İşlemi

### Eşlenik

Bir karmaşık sayının eşleniği, sanal kısmın işaretinin değiştirilmesiyle elde edilir.

$$3 + 4i \rightarrow 3 - 4i$$

### Bölme

Bölme için eşlenik kullanılır.

$$\frac{a + bi}{c + di} = \frac{(a + bi)(c - di)}{(c + di)(c - di)}$$

Paydayı açalım.

$$(c + di)(c - di) = c^2 - cdi + cdi - d^2i^2 = c^2 + d^2$$

Pay kısmını da açalım. Daha önce çarpma işleminde yaptığımız gibi $i^2 = -1$ kullanarak dağıtma işlemi yapıyoruz.

$$(a + bi)(c - di) = (ac + bd) + (bc - ad)i$$

Sonuç olarak:

$$\frac{a + bi}{c + di} = \frac{(ac + bd) + (bc - ad)i}{c^2 + d^2}$$

Artık bölme işlemi çok daha kolay hale geldi. Üstte karmaşık bir sayı var, altta ise gerçek bir sayı. Karmaşık bir sayıyı gerçek bir sayıya bölmek, gerçek ve sanal kısımları ayrı ayrı bölmek anlamına gelir.

$$\frac{a + bi}{r} = \frac{a}{r} + \frac{b}{r}i$$

Bu durumda da:

$$\frac{(ac + bd) + (bc - ad)i}{c^2 + d^2} = \frac{ac + bd}{c^2 + d^2} + \frac{bc - ad}{c^2 + d^2}i$$

---

## Karmaşık Düzlem ve Modulo

Karmaşık sayılar, iki boyutlu düzlemde gösterilir: **gerçek kısım** yatay eksende, **sanal kısım** dikey eksendedir. Bu düzleme **karmaşık düzlem** denir.

Örneğin, $z = 3 + 2i$ karmaşık sayısı, Kartezyen düzlemde $(3, 2)$ noktasını temsil eder.

Bu temsille birlikte, her karmaşık sayıyı bir **vektör** gibi düşünebiliriz. Bu durumda, modulo (veya mutlak değer), bu vektörün orijine olan uzaklığıdır.

### Modulo Nedir?

Bir karmaşık sayının modulo, orijinden olan uzaklıktır. Dik üçgende Pisagor kullanılır.

$$|a + bi| = \sqrt{a^2 + b^2}$$

Yani $a + bi$ sayısının modulosu, $(a, b)$ noktasının orijine olan öklidyen uzaklığıdır.

Modulo, çarpma üzerinde dağıtılabilir.

$$|z_1 \cdot z_2| = |z_1| \cdot |z_2|$$

Toplama için bu geçerli değil ama üçgen eşitsizliği kuralı geçerlidir.

$$|z_1 + z_2| \leq |z_1| + |z_2|$$

## Karmaşık Sayıların Üssünü Alma ve Euler'in Formülü

### Gerçek Sayının Sanal Kuvveti

Euler'in çok meşhur formülü:

$$e^{i\theta} = \cos\theta + i\sin\theta$$

Bu formül sayesinde, gerçek bir sayıyı (özellikle $e$ gibi özel bir sayıyı) sanal kuvvete yükseltebiliriz.

$$e^{i\frac{\pi}{2}} = i, \quad e^{i\pi} = -1, \quad e^{2i\pi} = 1$$

Ve tabii ki:

$$e^{i\pi} + 1 = 0$$

### Karmaşık Üs: $e^{a + bi}$

Gerçek üs ve sanal üsleri ayırarak hesaplayabiliriz.

$$e^{a + bi} = e^a \cdot e^{bi}$$

Euler formülünü kullanırsak:

$$e^{a + bi} = e^a \cdot (\cos b + i \sin b)$$

## Karmaşık Kuvvet: $r^{a + bi}$

Gerçek sayının karmaşık üssünü alabilmek için logaritma ve Euler formülü kullanılabilir

1. $r^{a + bi} = r^a \cdot r^{bi}$
2. $r = e^{\ln r}$ olduğundan,
3. $r^{bi} = e^{bi \cdot \ln r} = \cos(b \ln r) + i \sin(b \ln r)$

Gerçek kısmı:
$$r^a \cdot \cos(b \ln r)$$

Sanal kısmı:
$$r^a \cdot \sin(b \ln r)i$$

## Kutupsal Gösterim

Karmaşık sayılar yalnızca cebirsel olarak değil, aynı zamanda **geometrik** olarak da temsil edilebilir. Bu temsillerden biri de **kutupsal (polar) gösterim**dir.

### Euler Formülü ve Birim Çember

Euler'in formülünü hatırlayalım:

$$e^{i\theta} = \cos\theta + i\sin\theta$$

Bu ifade, $\theta$ açısına sahip bir karmaşık sayının, karmaşık düzlemde bir **birim çember** üzerinde olduğunu gösterir. Çünkü bu sayının uzaklığı her zaman 1'dir.

$$|e^{i\theta}| = \sqrt{\cos^2\theta + \sin^2\theta} = 1$$

Yani $e^{i\theta}$ ifadesi, karmaşık düzlemde merkezdeki (0,0) noktasından birim uzaklıkta ve $\theta$ yönünde bir noktayı gösterir.

---

### Karmaşık Sayının Kutupsal Gösterimi

Her karmaşık sayı $z = a + bi$, düzlemde $(a, b)$ noktasını temsil eder. Ama aynı zamanda bunu bir **modulo** ve bir **açı (faz)** ile de ifade edebiliriz.

$$z = r \cdot e^{i\theta}$$

Burada:

- $r = |z| = \sqrt{a^2 + b^2}$ → sayının modulosu (orijinden uzaklığı)
- $\theta = \arg(z) = \tan^{-1}(\frac{b}{a})$ → sayının yönü, yani orijine göre yaptığı açı

Bu gösterim, özellikle çarpma, bölme ve üs alma gibi işlemleri çok daha kolay hale getirir.

- Modulolar çarpılır: $|z_1 \cdot z_2| = |z_1| \cdot |z_2|$
- Açılar toplanır: $\arg(z_1 \cdot z_2) = \arg(z_1) + \arg(z_2)$

---

### Polar ve Kartezyen Gösterim Arası Dönüşüm

- **Kartezyen'den Polar'a**
  $$r = \sqrt{a^2 + b^2}, \quad \theta = \tan^{-1}\left(\frac{b}{a}\right)$$

- **Polar'dan Kartezyene**
  $$z = r \cdot (\cos\theta + i\sin\theta)$$

### Kutupsal Formda Çarpma İşlemi

Karmaşık sayılar kutupsal formda çarpılırken modüller çarpılır, açılar toplanır:

$$(r_1 e^{i\theta_1})(r_2 e^{i\theta_2}) = r_1 r_2 e^{i(\theta_1 + \theta_2)}$$

Bu özellik kuantum mekaniğinde son derece yararlıdır, çünkü kuantum durumları genellikle kutupsal formda karmaşık sayılar olarak temsil edilir.

## Bunları Neden Öğreniyoruz?

Karmaşık sayılar, kuantum bilişimin temel taşlarından biridir. Kuantum bilgisayarları ve algoritmalarını anlayabilmek için bu tür matematiksel kavramlara aşina olmak gerekir.

Kuantum mekaniğinde, bir kuantum sisteminin durumu **kuantum genliği** adı verilen karmaşık bir sayı ile tanımlanır. Bu genlikler, sistemin farklı durumlarda ölçülme olasılığını belirler ve az önce öğrendiğimiz matematiksel kuralları takip eder.

Bu karmaşık sayıların fazı (açısı) kuantum sistemlerde fiziksel bir şeyi temsil eder - sadece matematiksel bir soyutlama değildir. Kuantum durumları birbirleriyle girişim yaptığında, girişimin yapıcı mı yoksa yıkıcı mı olacağını belirleyen öğrendiğimiz karmaşık sayı aritmetiğidir.

Bu kavramları derinlemesine anlamak, kuantum bilişim yolculuğunuzu çok daha kolay hale getirecektir. Bazı kısımlar kafa karıştırıcı olabilir, ama amacımız bunları ezberlemek değil, mantığını kavramak ve kuantum dünyasıyla nasıl bağlantı kurduklarını görmektir.
