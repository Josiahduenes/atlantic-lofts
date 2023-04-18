/* eslint-disable no-console */
window.Webflow ||= [];
window.onload = async () => {
  window.Webflow.push(() => {
    console.log('YES IM WORKIN!');
    const apiKey =
      'patjjOTvTCOCRglVs.aebd3d4f85a600cb5c228228069c341ce0f9a89ebff08f71e60fcb2c103a0adf';
    const baseId = 'app6ak5FPSA3mu0KZ';
    const tableName = 'tblVr5AYC033ux66F';
    const apiUrl = `https://api.airtable.com/v0/${baseId}/${tableName}`;
    fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })
      .then((response) => response.json())
      .then(async (data) => {
        const { records } = data; //Records = Full Data from AirTable.
        const formattedData = records.map((record) => {
          const { fields } = record;
          return {
            email: fields.Email, //Format Data to "Email" : "<userEmail>". Used in custom Wized req.
          };
        });
        await Wized.data.setVariable('memberemaillist', formattedData); //Set custom Wized variable "memberemaillist" to JSON Object of member emails from airtable.
      })
      .catch((error) => console.error(error));
  });
};
