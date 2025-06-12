---
title: 'Sanal ve Karmaşık Sayılar'
date: '2023-06-15T12:00:00.000Z'
excerpt: 'Kuantum hesaplamanın temelindeki matematiksel kavramları ve Q# dilinde nasıl uygulandıklarını inceliyoruz.'
author: 'Adem'
part: 2
language: 'tr'
---

# Sanal ve Karmaşık Sayılar

Önceki bölümde bilgisayarlardan bahsetmiştik. Bu bölümde matematiksel terimlerden ve bu terimlerin Q# dilinde kodlanmasından bahsedeceğiz.

## Sanal Sayılar Nedir?

Gerçek sayılarla bazı denklemleri çözemeyiz.

$$x^2 = -1$$

Bunu çözemiyoruz çünkü bir sayının karesi negatif olamaz. Matematikçiler bu sorunu çözmek için yeni bir sayı icat etmiş ve ona i adını vermişler:

$$i^2 = -1$$

i gerçek bir sayı olamayacağından olayı **sanal sayı** olarak adlandırılmış. Tek farkı karesinin -1 olması onun dışında sayılar üzerinde yaptığımız işlemler i üzerinde de yapılabilir.

$$i + i = 2i$$

$$i - i = 0$$

$$(-1) \cdot i = -i$$

$$(-i)^2 = -1$$

i sayısı ve i'nin katları da sanal sayı olarak adlandırılır.

## Sanal Sayının Kuvvetleri

### Problem Tanımı

**Girdi:** Çift bir tamsayı, n (negatif olabilir).

**Çıktı:** $i^n$ değerini döndür.

```qsharp
namespace Imaginary {
    function PowersOfI(n : Int) : Int {
        // Eğer n, 4'e tam bölünüyorsa
        if n % 4 == 0 {
            return 1;
        } else {
            return -1;
        }
    }
}
```

### Açıklama

Sanal sayı i'nin kuvvetleri döngüseldir.

- $i^0 = 1$
- $i^1 = i$
- $i^2 = -1$
- $i^3 = -i$
- $i^4 = 1$

Girdi her zaman çift sayı olduğu garanti edildiğinden, sadece şu iki durumu göz önünde bulundurmak yeterlidir:

- $n \equiv 0 \pmod{4}$ olduğunda: $i^n = 1$
- $n \equiv 2 \pmod{4}$ olduğunda: $i^n = -1$

Modulo (mod) operatörü, bir sayının başka bir sayıya bölümünden kalan değeri verir. Q# dilinde bu % sembolüyle gösterilir. Hangi değerin döndürüleceğini belirlemek için parametre olarak verilen n sayısının 4'e tam bölünüp bölünmediğini kontrol ederek çözüme ulaştık.

## Karmaşık Sayılar Nedir?

Gerçek sayı ile sanal sayı birleşince **karmaşık sayı** oluşur:

$$a + bi$$

Burada a ve b gerçek sayılar, i ise yukarıda tanımladığımız sanal sayı.

$$3 + 4i, \quad -5 - 2i$$

Hatta bildiğimiz gerçek sayılar bile aslında karmaşık sayıların özel bir hali olarak gösterilebilir:

$$2 = 2 + 0i, \quad -3i = 0 - 3i$$

Q# dilinde karmaşık sayılar doğrudan desteklenmez ama **Std.Math** içerisinde tanımlı Complex adında özel bir struct tipi var.

```qsharp
namespace Complex {
	// x = a + bi
	let (a, b) = (x.Real, x.Imag);
}
```

---

## Karmaşık Sayılarla İşlemler

Q# dilinde karmaşık sayılarla işlem yapmak için özel fonksiyonlar bulunmakta fakat daha iyi öğrenebilmek için bu aşamada o fonksiyonları kullanmayacağız.

### Toplama

**Girdi:**

1. Karmaşık sayı $x=a+bi$.
2. Karmaşık sayı $y=c+di$.

**Çıktı:** x + y toplamını karmaşık sayı olarak döndür.

Karmaşık sayıları toplamak için gerçek ve sanal kısımlar ayrı ayrı toplanır:

$$(1 + 2i) + (3 + 4i) = 4 + 6i$$

```qsharp
namespace Complex {
    function ComplexAdd(x : Complex, y : Complex) : Complex {
        return Complex(x.Real + y.Real, x.Imag + y.Imag);
    }
}
```

### Çarpma

Çarpmak için dağıtma işlemi yapılır ve $i^2 = -1$ kullanılır.

Bu iki sayıyı çarpmak için klasik dağıtma yöntemiyle işlem yapılır.

$$x \cdot y = (a + bi)(c + di)$$

$$= a \cdot c + a \cdot di + b \cdot i \cdot c + b \cdot i \cdot d \cdot i$$

$$= ac + adi + bci + bdi^2$$

$$bdi^2 = bd \cdot (-1) = -bd$$

Son olarak terimleri gruplandıralım

- **Gerçek kısım:** $ac - bd$
- **Sanal (imaginary) kısım:** $ad + bc$

$$(a + bi)(c + di) = (ac - bd) + (ad + bc)i$$

**Girdi:**

1. Karmaşık sayı $x=a+bi$.
2. Karmaşık sayı $y=c+di$.

**Çıktı:** x \* y çarpımını karmaşık sayı olarak döndür.

```qsharp
namespace Complex {
    function ComplexMult(x : Complex, y : Complex) : Complex {
        return Complex(
            x.Real * y.Real - x.Imag * y.Imag,
            x.Real * y.Imag + x.Imag * y.Real
        );
    }
}
```

---

## Eşlenik ve Bölme İşlemi

### Eşlenik

Bir karmaşık sayının eşleniği, sanal kısmın işaretinin değiştirilmesiyle elde edilir.

$$3 + 4i \rightarrow 3 - 4i$$

**Girdi:** Karmaşık sayı $x=a+bi$.

**Çıktı:** Karmaşık sayının eşleniğini döndür.

```qsharp
namespace Complex {
    function ComplexConjugate(x : Complex) : Complex {
        return Complex(x.Real, -x.Imag);
    }
}
```

### Bölme

Bölme için eşlenik kullanılır.

$$\frac{a + bi}{c + di} = \frac{(a + bi)(c - di)}{(c + di)(c - di)}$$

Paydayı açalım.

$$(c + di)(c - di) = c^2 - cdi + cdi - d^2i^2 = c^2 + d^2$$

Pay kısmını da açalım. Daha önce çarpma işleminde yaptığımız gibi $i^2 = -1$ kullanarak dağıtma işlemi yaptık.

$$(a + bi)(c - di) = (ac + bd) + (bc - ad)i$$

Sonuç olarak:

$$\frac{a + bi}{c + di} = \frac{(ac + bd) + (bc - ad)i}{c^2 + d^2}$$

Artık bölme işlemi çok daha kolay hale geldi. Üstte karmaşık bir sayı var, altta ise gerçek bir sayı. Karmaşık bir sayıyı gerçek bir sayıya bölmek, gerçek ve sanal kısımları ayrı ayrı bölmek anlamına gelir.

$$\frac{a + bi}{r} = \frac{a}{r} + \frac{b}{r}i$$

Bu durumda da:

$$\frac{(ac + bd) + (bc - ad)i}{c^2 + d^2} = \frac{ac + bd}{c^2 + d^2} + \frac{bc - ad}{c^2 + d^2}i$$

```qsharp
namespace Complex {
    function ComplexDiv(x : Complex, y : Complex) : Complex {
        let (a, b) = (x.Real, x.Imag);
        let (c, d) = (y.Real, y.Imag);
        let denominator = c * c + d * d;
        let real = (a * c + b * d) / denominator;
        let imag = (b * c - a * d) / denominator;
        return Complex(real, imag);
    }
}
```

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

```qsharp
namespace Complex {
    function ComplexModulus(x : Complex) : Double {
        let (a, b) = (x.Real, x.Imag);
        return Sqrt(a * a + b * b);
    }
}
```

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

```qsharp
namespace Complex {
    open Std.Math;

    function ComplexExponent(x : Complex) : Complex {
        return Complex(
            E()^x.Real * Cos(x.Imag),
            E()^x.Real * Sin(x.Imag)
        );
    }
}
```

## Karmaşık Kuvvet: $r^{a + bi}$

Gerçek sayının karmaşık üssünü alabilmek için logaritma ve Euler formülü kullanılabilir

1. $r^{a + bi} = r^a \cdot r^{bi}$
2. $r = e^{\ln r}$ olduğundan,
3. $r^{bi} = e^{bi \cdot \ln r} = \cos(b \ln r) + i \sin(b \ln r)$

Gerçek kısmı:
$$r^a \cdot \cos(b \ln r)$$

Sanal kısmı:
$$r^a \cdot \sin(b \ln r)i$$

```qsharp
namespace Complex {
    function ComplexExpReal(r : Double, x : Complex) : Complex {
        if AbsD(r) < 1e-9 {
            return Complex(0., 0.);
        }

        let ra = r^x.Real;
        let lnr = Log(r);
        return Complex(ra * Cos(x.Imag * lnr), ra * Sin(x.Imag * lnr));
    }
}
```

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

Q# dilinde polar formdaki karmaşık sayılar, Std.Math isim alanındaki ComplexPolar türü ile temsil edilir.

**Bir karmaşık sayının modülünü ve fazını almak**

```qsharp
let r = x.Magnitude;
let theta = x.Argument;
```

Q# ComplexAsComplexPolar fonksiyonu bu dönüşümü yapmak için kullanılmaktadır. Fakat önceki işlemlerde olduğu gibi burada da eğitim amacıyla bu fonksiyonu kullanmadan yapacağız.

```qsharp
namespace Complex {
    function ComplexToComplexPolar(x : Complex) : ComplexPolar {
        return ComplexPolar(
            Sqrt(x.Real * x.Real + x.Imag * x.Imag),
            ArcTan2(x.Imag, x.Real)
        );
    }
}
```

### Kutupsaldan Kartezyene Dönüşüm

```qsharp
namespace Complex {
    function ComplexPolarToComplex(x : ComplexPolar) : Complex {
        return Complex(
            x.Magnitude * Cos(x.Argument),
            x.Magnitude * Sin(x.Argument)
        );
    }
}
```

### Kutupsal Formda Çarpma İşlemi

Karmaşık sayılar kutupsal formda çarpılırken modüller çarpılır, açılar toplanır:

$$(r_1 e^{i\theta_1})(r_2 e^{i\theta_2}) = r_1 r_2 e^{i(\theta_1 + \theta_2)}$$

```qsharp
namespace Complex {
    function ComplexPolarMult(x : ComplexPolar, y : ComplexPolar) : ComplexPolar {
        mutable theta = x.Argument + y.Argument;
        if (theta > PI()) {
            set theta -= 2.0 * PI();
        }
        if (theta <= -PI()) {
            set theta += 2.0 * PI();
        }
        return ComplexPolar(x.Magnitude * y.Magnitude, theta);
    }
}
```

## Bunları Neden Öğreniyoruz?

Karmaşık sayılar, kuantum bilişimin temel taşlarından biridir. Kuantum bilgisayarları ve algoritmalarını anlayabilmek için bu tür matematiksel kavramlara aşina olmak gerekir. Evet, bazı kısımlar kafa karıştırıcı olabilir; ancak amacımız bunları ezberlemek değil, mantığını kavramaktır. Bu bölüm ve diğer matematiksel konular zaman zaman sıkıcı gelebilir, ama temel prensipleri anlamak ileride işinizi oldukça kolaylaştıracaktır.
