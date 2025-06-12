---
title: 'Imaginary and Complex Numbers'
date: '2023-06-15T12:00:00.000Z'
excerpt: 'Exploring the mathematical concepts behind quantum computing and how they are implemented in Q#.'
author: 'Adem'
part: 2
language: 'en'
---

# Imaginary and Complex Numbers

In the previous episode, we talked about computers. In this episode, we'll discuss mathematical terms and how they are coded in the Q# language.

## What Are Imaginary Numbers?

We cannot solve some equations with real numbers.

$$x^2 = -1$$

We can't solve this because a number's square cannot be negative. Mathematicians invented a new number to solve this problem and called it i:

$$i^2 = -1$$

Since i cannot be a real number, it was called an **imaginary number**. The only difference is that its square is -1; otherwise, operations we do on numbers can also be done on i.

$$i + i = 2i$$

$$i - i = 0$$

$$(-1) \cdot i = -i$$

$$(-i)^2 = -1$$

The number i and multiples of i are called imaginary numbers.

## Powers of Imaginary Numbers

### Problem Definition

**Input:** An even integer, n (can be negative).

**Output:** Return the value of $i^n$.

```qsharp
namespace Imaginary {
    function PowersOfI(n : Int) : Int {
        // If n is divisible by 4
        if n % 4 == 0 {
            return 1;
        } else {
            return -1;
        }
    }
}
```

### Explanation

The powers of the imaginary number i are cyclic.

- $i^0 = 1$
- $i^1 = i$
- $i^2 = -1$
- $i^3 = -i$
- $i^4 = 1$

Given that the input is always an even number, it's sufficient to consider just these two cases:

- When $n \equiv 0 \pmod{4}$: $i^n = 1$
- When $n \equiv 2 \pmod{4}$: $i^n = -1$

The modulo (mod) operator gives the remainder when one number is divided by another. In Q#, this is represented by the % symbol. We solved this by checking if the parameter n is divisible by 4 to determine which value to return.

## What Are Complex Numbers?

When a real number combines with an imaginary number, a **complex number** is formed:

$$a + bi$$

Here, a and b are real numbers, and i is the imaginary number we defined above.

$$3 + 4i, \quad -5 - 2i$$

Even the real numbers we know can be represented as a special case of complex numbers:

$$2 = 2 + 0i, \quad -3i = 0 - 3i$$

Complex numbers are not directly supported in Q#, but there is a special struct type called Complex defined in **Std.Math**.

```qsharp
namespace Complex {
	// x = a + bi
	let (a, b) = (x.Real, x.Imag);
}
```

---

## Operations with Complex Numbers

There are special functions in Q# for operating with complex numbers, but for better learning, we won't use those functions at this stage.

### Addition

**Input:**

1. Complex number $x=a+bi$.
2. Complex number $y=c+di$.

**Output:** Return the sum x + y as a complex number.

To add complex numbers, add the real and imaginary parts separately:

$$(1 + 2i) + (3 + 4i) = 4 + 6i$$

```qsharp
namespace Complex {
    function ComplexAdd(x : Complex, y : Complex) : Complex {
        return Complex(x.Real + y.Real, x.Imag + y.Imag);
    }
}
```

### Multiplication

To multiply, use the distributive property and $i^2 = -1$.

To multiply these two numbers, use the classic distributive method.

$$x \cdot y = (a + bi)(c + di)$$

$$= a \cdot c + a \cdot di + b \cdot i \cdot c + b \cdot i \cdot d \cdot i$$

$$= ac + adi + bci + bdi^2$$

$$bdi^2 = bd \cdot (-1) = -bd$$

Finally, let's group the terms

- **Real part:** $ac - bd$
- **Imaginary part:** $ad + bc$

$$(a + bi)(c + di) = (ac - bd) + (ad + bc)i$$

**Input:**

1. Complex number $x=a+bi$.
2. Complex number $y=c+di$.

**Output:** Return the product x \* y as a complex number.

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

## Conjugate and Division

### Conjugate

The conjugate of a complex number is obtained by changing the sign of the imaginary part.

$$3 + 4i \rightarrow 3 - 4i$$

**Input:** Complex number $x=a+bi$.

**Output:** Return the conjugate of the complex number.

```qsharp
namespace Complex {
    function ComplexConjugate(x : Complex) : Complex {
        return Complex(x.Real, -x.Imag);
    }
}
```

### Division

For division, the conjugate is used.

$$\frac{a + bi}{c + di} = \frac{(a + bi)(c - di)}{(c + di)(c - di)}$$

Let's expand the denominator.

$$(c + di)(c - di) = c^2 - cdi + cdi - d^2i^2 = c^2 + d^2$$

Let's also expand the numerator. Like in the multiplication operation, we did the distribution using $i^2 = -1$.

$$(a + bi)(c - di) = (ac + bd) + (bc - ad)i$$

The result is:

$$\frac{a + bi}{c + di} = \frac{(ac + bd) + (bc - ad)i}{c^2 + d^2}$$

Division has now become much easier. There's a complex number on top and a real number on the bottom. Dividing a complex number by a real number means dividing the real and imaginary parts separately.

$$\frac{a + bi}{r} = \frac{a}{r} + \frac{b}{r}i$$

In this case:

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

## Complex Plane and Modulus

Complex numbers are represented in a two-dimensional plane: the **real part** on the horizontal axis, the **imaginary part** on the vertical axis. This plane is called the **complex plane**.

For example, the complex number $z = 3 + 2i$ corresponds to the point $(3, 2)$ in the Cartesian plane.

With this representation, we can think of each complex number as a **vector**. In this case, the modulus (or absolute value) is the distance of this vector from the origin.

### What is Modulus?

The modulus of a complex number is the distance from the origin. The Pythagorean theorem is used in the right triangle.

$$|a + bi| = \sqrt{a^2 + b^2}$$

So, the modulus of the number $a + bi$ is the Euclidean distance of the point $(a, b)$ from the origin.

The modulus can be distributed over multiplication.

$$|z_1 \cdot z_2| = |z_1| \cdot |z_2|$$

This is not valid for addition, but the triangle inequality rule applies.

$$|z_1 + z_2| \leq |z_1| + |z_2|$$

```qsharp
namespace Complex {
    function ComplexModulus(x : Complex) : Double {
        let (a, b) = (x.Real, x.Imag);
        return Sqrt(a * a + b * b);
    }
}
```

## Complex Exponentiation and Euler's Formula

### Imaginary Power of a Real Number

Euler's famous formula:

$$e^{i\theta} = \cos\theta + i\sin\theta$$

With this formula, we can raise a real number (especially a special number like $e$) to an imaginary power.

$$e^{i\frac{\pi}{2}} = i, \quad e^{i\pi} = -1, \quad e^{2i\pi} = 1$$

And of course:

$$e^{i\pi} + 1 = 0$$

### Complex Exponent: $e^{a + bi}$

We can calculate by separating the real exponent and imaginary exponent.

$$e^{a + bi} = e^a \cdot e^{bi}$$

Using Euler's formula:

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

## Complex Power: $r^{a + bi}$

To raise a real number to a complex power, logarithms and Euler's formula can be used

1. $r^{a + bi} = r^a \cdot r^{bi}$
2. Since $r = e^{\ln r}$,
3. $r^{bi} = e^{bi \cdot \ln r} = \cos(b \ln r) + i \sin(b \ln r)$

Real part:
$$r^a \cdot \cos(b \ln r)$$

Imaginary part:
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

## Polar Representation

Complex numbers can be represented not only algebraically but also **geometrically**. One of these representations is the **polar representation**.

### Euler's Formula and the Unit Circle

Recall Euler's formula:

$$e^{i\theta} = \cos\theta + i\sin\theta$$

This expression shows that a complex number with angle $\theta$ lies on a **unit circle** in the complex plane. This is because the distance of this number is always 1.

$$|e^{i\theta}| = \sqrt{\cos^2\theta + \sin^2\theta} = 1$$

So, the expression $e^{i\theta}$ indicates a point in the complex plane at unit distance from the center (0,0) and in the direction of $\theta$.

---

### Polar Representation of a Complex Number

Every complex number $z = a + bi$ represents the point $(a, b)$ in the plane. But we can also express this with a **modulus** and an **angle (phase)**.

$$z = r \cdot e^{i\theta}$$

Here:

- $r = |z| = \sqrt{a^2 + b^2}$ → the modulus of the number (distance from the origin)
- $\theta = \arg(z) = \tan^{-1}(\frac{b}{a})$ → the direction of the number, i.e., the angle it makes with respect to the origin

This representation makes operations like multiplication, division, and exponentiation much easier.

- Moduli are multiplied: $|z_1 \cdot z_2| = |z_1| \cdot |z_2|$
- Angles are added: $\arg(z_1 \cdot z_2) = \arg(z_1) + \arg(z_2)$

---

### Conversion Between Polar and Cartesian Representation

- **From Cartesian to Polar**
  $$r = \sqrt{a^2 + b^2}, \quad \theta = \tan^{-1}\left(\frac{b}{a}\right)$$

- **From Polar to Cartesian**
  $$z = r \cdot (\cos\theta + i\sin\theta)$$

In Q#, complex numbers in polar form are represented by the ComplexPolar type in the Std.Math namespace.

**Getting the modulus and phase of a complex number**

```qsharp
let r = x.Magnitude;
let theta = x.Argument;
```

The Q# ComplexAsComplexPolar function is used to make this conversion. But as with previous operations, we'll do it without using this function for educational purposes.

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

### Conversion from Polar to Cartesian

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

### Multiplication in Polar Form

When multiplying complex numbers in polar form, the moduli are multiplied, and the angles are added:

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

## Why Are We Learning These?

Complex numbers are one of the fundamental building blocks of quantum computing. To understand quantum computers and algorithms, you need to be familiar with these kinds of mathematical concepts. Yes, some parts can be confusing, but our aim is not to memorize them but to understand their logic. This section and other mathematical topics may seem boring at times, but understanding the basic principles will make your job much easier in the future.
