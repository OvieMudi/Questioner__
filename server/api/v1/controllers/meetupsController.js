import Meetups from '../helpers/meetups';

class meetupsController {
  static postMeetup(req, res) {
    try {
      const meetup = Meetups.createMeetup(req.body);
      return res.status(201).json({
        status: 201, data: [meetup],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400, error: error.message,
      });
    }
  }

  static getMeetups(req, res) {
    const meetup = Meetups.getMeetups();
    return res.status(200).json({
      status: 200, data: meetup,
    });
  }

  static getMeetup(req, res) {
    const meetup = Meetups.getMeetup(req.params.id);
    if (!meetup) {
      return res.status(404).json({
        status: 400, error: 'meetup does not exist',
      });
    }
    return res.status(200).json({
      status: 200, data: [meetup],
    });
  }

  static updateMeetup(req, res) {
    try {
      const updatedMeetup = Meetups.updateMeetup(req.params.id, req.body);
      if (!updatedMeetup) {
        return res.status(404).json({
          status: 404, error: 'meetup does not exist',
        });
      }
      return res.status(200).json({
        status: 200, data: [updatedMeetup],
      });
    } catch (error) {
      return res.status(400).json({
        status: 400, error: error.message,
      });
    }
  }

  static deleteMeetup(req, res) {
    const deleted = Meetups.deleteMeetup(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        status: 404, error: 'meetup does not exist',
      });
    }
    return res.status(200).json({
      status: 200, message: 'meetup deleted',
    });
  }
}

export default meetupsController;
