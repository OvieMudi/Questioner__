import db, { meetupModel } from '../../../db/v1/db';

const meetupsDB = db.meetups;

class Meetups {
  static createMeetup(data) {
    const meetup = {
      id: parseInt(Math.random() * 1000000, 10),
      createdOn: new Date(),
    };
    const propNames = Object.keys(meetupModel);
    propNames.forEach((propName) => {
      if (propName === 'id' || propName === 'createdOn') return; // continue next loop
      if (!data[propName] && propName !== 'images') { // images are optional
        throw Error(`${propName} is empty/invalid`);
      }
      if (propName === 'images') {
        const images = Meetups.validateImages(data[propName]);
        meetup[propName] = images;
        return;
      }
      if (propName === 'tags') {
        const tags = Meetups.validateTags(data[propName]);
        meetup[propName] = tags;
        return;
      }
      if (propName === 'happeningOn') {
        const happeningOn = Meetups.setHappeningOn(data[propName]);
        meetup[propName] = happeningOn;
        return;
      }
      if (data[propName].length < 3) {
        throw Error(`invalid ${propName}`);
      }
      meetup[propName] = data[propName];
    }); // end forEach
    meetupsDB.push(meetup);
    return Meetups.getMeetup(meetup.id);
  }

  static getMeetups() {
    return meetupsDB;
  }

  static getMeetup(idString) {
    const id = parseInt(idString, 10);
    const meetup = meetupsDB.find(obj => obj.id === id);
    return meetup;
  }

  static updateMeetup(idString, data) {
    const id = parseInt(idString, 10);
    const meetup = meetupsDB.find(obj => obj.id === id);
    const propNames = Object.keys(data);
    propNames.forEach((propName) => {
      if (propName === 'id' || propName === 'createdOn') return; // continue next loop
      if (!data[propName] && propName !== 'images') return; // images are optional
      if (propName === 'images') {
        const images = Meetups.validateImages(data[propName]);
        meetup[propName] = images;
        return;
      }
      if (propName === 'tags') {
        const tags = Meetups.validateTags(data[propName]);
        meetup[propName] = tags;
        return;
      }
      if (propName === 'happeningOn') {
        const happeningOn = Meetups.setHappeningOn(data[propName]);
        meetup[propName] = happeningOn;
        return;
      }
      if (data[propName].length < 3) {
        throw Error(`invalid ${propName}`);
      }
      meetup[propName] = data[propName];
    }); // end forEach
    return Meetups.getMeetup(id);
  }

  static deleteMeetup(idString) {
    const id = parseInt(idString, 10);
    const deleted = meetupsDB.find((meetup, index) => {
      if (meetup.id === id) meetupsDB.splice(index, 1);
      return meetup.id === id;
    });
    return deleted;
  }

  static validateImages(imagesArray) {
    const error = Error('invalid images');
    if (!(imagesArray instanceof Array)) return [];
    if (!(imagesArray.length === 0)) return imagesArray;
    if (!imagesArray.every(image => image.length > 10)) throw error;
    return imagesArray;
  }

  static validateTags(tagsArray) {
    const error = Error('invalid tags');
    if (!(tagsArray instanceof Array)) throw error;
    if (!tagsArray.every(tag => tag.length > 3)) throw error;
    return tagsArray;
  }

  static setHappeningOn(dateString) {
    const error = new Error('invalid date string');
    if (typeof dateString !== 'string') throw error;
    const happeningOn = new Date(dateString);
    if (!happeningOn.getDate()) throw error;
    return happeningOn;
  }
}

export default Meetups;
