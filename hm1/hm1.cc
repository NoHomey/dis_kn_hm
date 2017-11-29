#include <iostream>
#include <cstddef>
#include <cmath>
#include <limits>
#include <vector>

using Sequence = std::vector<double>;

const double epsilon = std::numeric_limits<double>::epsilon();

const std::size_t indexesCount = 5;

const std::size_t initialCapacity = 1024;

bool isBigger(const double left, const double right) {
    return (left - right) > epsilon;
}

bool isSmaller(const double left, const double right) noexcept {
    return (left - right) < epsilon;
}

enum class Limit {minusInfinity, minus6, minus3, Infinity};

// returns lim n -> infinity an bases on a1
Limit liman(const double a) noexcept {
    if((a == -6) || (a == 3)) {
        return Limit::minus6;
    }
    if(isBigger(a, 9)) {
        return Limit::Infinity;
    }
    if(isBigger(a, -6) && isSmaller(a, 3)) {
        return Limit::minus3;
    }
    return Limit::minusInfinity;
}

// prints lim n -> infinity an bases on a1
void printLimit(const Limit limit) noexcept {
    switch(limit) {
        case Limit::minusInfinity:
            std::cout << "-infinity" << std::endl;
            return;
        case Limit::minus6:
            std::cout << '-' << '6' << std::endl;
            return;
        case Limit::minus3:
            std::cout << '-' << '3' << std::endl;
            return;
        case Limit::Infinity:
            std::cout << "infinity" << std::endl;
            return;
    }
}

double an(Sequence& seq, const std::size_t n) noexcept {
    if(seq.size() >= n) {
        return seq[n - 1];
    }
    double last = seq.back();
    for(std::size_t index = seq.size(); index < n; ++index) {
        last = (2 * (last * last) + 18) / (last - 9);
        seq.push_back(last);
    }
    return last;
}

// prints an (if an is not finite it will use limit to print the correct signed infinity)
void printan(const double an, const Limit limit) noexcept {
    if(std::isfinite(an)) {
        std::cout << std::fixed << an << std::endl;
    } else {
        printLimit(limit);
    }
}

int main() {
    double a;

    while(true) {
        std::cout << "lambda = ";
        std::cin >> a;
        if(std::cin) {
            break;
        }
        std::cin.clear();
        std::cin.ignore();
    }
    const Limit lim = liman(a);
    std::cout << "lim n -> infinity an = ";
    printLimit(lim);

    Sequence seq;
    seq.reserve(initialCapacity);

    seq.push_back(a);

    std::size_t n = 0;

    std::cout.precision(std::numeric_limits<double>::max_digits10);

    for(std::size_t i = 0; i < indexesCount; ++i) {
        n = 0;
        while(!n) {
            std::cout << 'k' << (i + 1) << " = ";
            std::cin >> n;
            if(!std::cin.good()) {
                std::cin.clear();
                std::cin.ignore();
            }
        }
        std::cout << "\t => a" << n << " = ";
        printan(an(seq, n), lim);
    }

    return 0;
}