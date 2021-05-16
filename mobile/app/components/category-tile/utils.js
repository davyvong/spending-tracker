// Source: https://undraw.co/

import DroneSurveillance from 'assets/svg/drone-surveillance.svg';
import Education from 'assets/svg/education.svg';
import EverydayLife from 'assets/svg/everyday-life.svg';
import FastCar from 'assets/svg/fast-car.svg';
import GiftBox from 'assets/svg/gift-box.svg';
import HavingFun from 'assets/svg/having-fun.svg';
import Journey from 'assets/svg/journey.svg';
import Medicine from 'assets/svg/medicine.svg';
import Payments from 'assets/svg/payments.svg';
import Savings from 'assets/svg/savings.svg';
import SmartHome from 'assets/svg/smart-home.svg';
import Subway from 'assets/svg/subway.svg';
import SweetHome from 'assets/svg/sweet-home.svg';

export const getCategoryIcon = name => {
  switch (name?.toLowerCase()) {
    case 'automobile':
      return FastCar;
    case 'bills':
      return SmartHome;
    case 'debt':
      return Payments;
    case 'education':
      return Education;
    case 'entertainment':
      return HavingFun;
    case 'food':
      return EverydayLife;
    case 'gifts':
      return GiftBox;
    case 'health':
      return Medicine;
    case 'home':
      return SweetHome;
    case 'income':
      return Savings;
    case 'shopping':
      return DroneSurveillance;
    case 'transportation':
      return Subway;
    case 'travel':
      return Journey;
    default:
      return null;
  }
};
