<template>
  <main class="m-8">
    <template>
      <div class="flex flex-row justify-center items-center">
        <h1 class="text-center m-8 text-2xl">Select Contacts</h1>
        <v-btn color="primary" @click="sheet = true">Import</v-btn>
      </div>
      <v-autocomplete
        background-color="secondary"
        v-model="targets"
        :items="getContacts"
        filled
        chips
        color="primary lighten-3"
        label="Select"
        item-text="name"
        item-value="phone"
        multiple
      >
        <template v-slot:selection="data">
          <v-chip
            small
            v-bind="data.attrs"
            :input-value="data.selected"
            close
            @click="data.select"
            @click:close="removeTarget(data)"
          >
            {{ data.item.name }}
          </v-chip>
        </template>
        <template v-slot:item="data">
          <template v-if="typeof data.item !== 'object'">
            <v-list-item-content v-text="data.item"></v-list-item-content>
          </template>
          <template v-else>
            <v-list-item-content>
              <v-list-item-title v-html="data.item.name"></v-list-item-title>
              <v-list-item-subtitle
                v-html="formatPhone(data.item.phone)"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </template>
        </template>
      </v-autocomplete>
    </template>

    <template>
      <div class="flex flex-row justify-center items-center">
        <h1 class="text-center m-8 text-2xl">Schedule</h1>
        <v-switch
          v-model="schedule.enabled"
          :label="`Disable to send instantly.`"
        ></v-switch>
      </div>
      <div class="flex flex-row gap-4 sm:flex-col">
        <v-date-picker
          :disabled="!schedule.enabled"
          class="border-0"
          v-model="schedule.date"
          :min="nowDate"
          full-width
        ></v-date-picker>
        <v-time-picker
          :disabled="!schedule.date || !schedule.enabled"
          class="border-0"
          v-model="schedule.time"
          :min="minTime"
          format="24hr"
          use-seconds
          full-width
        ></v-time-picker>
      </div>
    </template>

    <template>
      <h1 class="text-center m-8 text-2xl">Content</h1>

      <v-textarea
        solo
        background-color="secondary"
        name="input-7-4"
        label="Content"
        v-model="content"
      ></v-textarea>
    </template>

    <v-btn block color="accent" @click="sendNow">Send Now!</v-btn>

    <template>
      <v-bottom-sheet v-model="sheet">
        <v-list>
          <v-subheader>Import Contacts</v-subheader>
          <v-list-item
            @click="
              sheet = false;
              csvDialog = true;
            "
          >
            <v-list-item-avatar>
              <v-avatar size="32px" tile>
                <img
                  :src="`https://visualpharm.com/assets/817/Import%20CSV-595b40b75ba036ed117d9e3f.svg`"
                  alt="csv"
                />
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-title>Import Csv File</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="
              sheet = false;
              singleDialog = true;
            "
          >
            <v-list-item-avatar>
              <v-avatar size="32px" tile>
                <img
                  :src="`https://visualpharm.com/assets/924/Contacts-595b40b65ba036ed117d3985.svg`"
                  alt="single"
                />
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-title>Import Single Contact</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-bottom-sheet>

      <v-dialog v-model="csvDialog" width="500">
        <v-card>
          <v-card-title dark class="text-h5"> Import Csv File </v-card-title>

          <v-card-text>
            <h5 class="font-bold">Please read before uploading csv!</h5>
            <br />
            <p>
              Csv file should include two columns without header. First column
              is for name surname, second column is for phone number. Phone
              numbers must only contain numbers. Example below.
            </p>
            <img src="../../assets/example-csv.png" alt="csv example" />
            <br />
            <v-file-input
              prepend-icon="mdi-file-table"
              v-model="csvFile"
              accept=".csv"
              label="Select your csv file"
              truncate-length="50"
            ></v-file-input>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              @click="
                importFromCsv();
                csvDialog = false;
              "
            >
              Import
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="singleDialog" width="500">
        <v-card>
          <v-card-title dark class="text-h5">
            Import Single Contact
          </v-card-title>

          <v-card-text>
            <v-form v-model="valid">
              <v-text-field
                v-model="name"
                :rules="nameRules"
                label="Name"
                required
              ></v-text-field>
              <v-text-field
                v-model="phone"
                :rules="phoneRules"
                label="Phone"
                placeholder="905361234567"
                required
                prefix="+"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              text
              :disabled="!valid"
              @click="
                importSingleContact();
                singleDialog = false;
              "
            >
              Import
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar color="error" v-model="snack.visible">
        {{ snack.text }}

        <template v-slot:action="{ attrs }">
          <v-btn
            color="white"
            text
            v-bind="attrs"
            @click="snack.visible = false"
          >
            CLOSE
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </main>
</template>

<script>
const electron = window.require("electron");
import * as Papa from "papaparse";

export default {
  name: "NewMessage",
  computed: {
    getContacts() {
      return [...this.$store.state.contacts, ...this.extendedContacts];
    },
    minTime() {
      if (this.nowDate === this.schedule.date) {
        return new Date().toISOString().slice(11, 19);
      } else return null;
    },
  },
  data() {
    return {
      nowDate: new Date().toISOString().slice(0, 10),
      snack: {
        visible: false,
        text: null,
      },
      sheet: false,
      csvDialog: false,
      singleDialog: false,
      csvFile: null,
      targets: [],
      content: null,
      extendedContacts: [],
      valid: false,
      name: "",
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => v.length <= 50 || "Name must be less than 50 characters",
      ],
      phone: "",
      phoneRules: [
        (v) => !!v || "Phone is required",
        (v) => v.length <= 13 || "Phone must be less than 14 characters",
        (v) => v.length >= 12 || "Phone must be more than 11 characters",
        (v) => RegExp("^[0-9]\\d*$").test(v) || "Phone must be valid",
      ],
      schedule: {
        date: null,
        time: null,
        enabled: true,
      },
    };
  },
  methods: {
    formatPhone(phone) {
      return "+" + phone.split("@")[0];
    },
    removeTarget(data) {
      const { index } = data;
      if (index >= 0) this.targets.splice(index, 1);
    },
    sendNow() {
      const { schedule, content, targets } = this;
      const message = {
        content,
        targets,
      };

      if (schedule.enabled) {
        message.schedule = new Date(
          `${schedule.date}T${schedule.time}`
        ).getTime();
        electron.ipcRenderer.send("scheduledMessage", message);
      } else {
        electron.ipcRenderer.send("instantMessage", message);
      }
    },
    async toJson(file) {
      return new Promise((resolve, reject) => {
        Papa.parse(file, {
          complete: function (results) {
            resolve(results.data);
          },
          error: function () {
            this.showError(`Error while parsing the file!`);
            reject();
          },
        });
      });
    },
    async importFromCsv() {
      const file = this.csvFile;

      if (!file) {
        return this.showError("Please select a file first!");
      }
      if (file.type !== "text/csv") {
        return this.showError(`Invalid file format: ${file.type}.`);
      }

      let contacts = await this.toJson(file);

      contacts = contacts.map((line) => {
        return { name: line[0], phone: `${line[1]}@s.whatsapp.net` };
      });

      this.extendedContacts.push(...contacts);

      this.csvFile = null;
    },
    showError(text) {
      this.snack.text = text;
      this.snack.visible = true;
    },
    importSingleContact() {
      const contact = {
        phone: `${this.phone}@s.whatsapp.net`,
        name: this.name,
      };
      this.extendedContacts.push(contact);
      this.phone = "";
      this.name = "";
    },
  },
};
</script>

<style>
.v-picker__title {
  height: 110px;
}
</style>
